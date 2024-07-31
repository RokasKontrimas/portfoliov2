<?php

namespace app\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Jobs\ReorderLabeledTasks;
use App\Jobs\UpdateTaskLabelJob;
use App\Models\Label;
use App\Models\Task;
use App\Models\UserTask;
use App\Traits\AttributeHandler;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use function PHPUnit\Framework\isEmpty;

class TaskController extends Controller
{
    use AttributeHandler;

    public function index(Request $request): JsonResponse
    {
        $taskModel = new Task();

        // Process relationships
        $validRequestedRelationships = $this->processRelationships($request, $taskModel);

        // Get pagination and sorting parameters
        [$perPage, $sortColumn, $sortDirection] = $this->getPaginationAndSortingParams($request, $taskModel);

        // Fetch data with relationships, sorting, and pagination
        $tasks = Task::with($validRequestedRelationships)
            ->orderBy($sortColumn, $sortDirection)
            ->paginate($perPage);

        return response()->json($tasks);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = new Task();
        try {
            // This will throw a validation exception if the data is not valid
            $validatedData = $request->validated();

            // Attach the authenticated user's ID as the creator of the task
            $validatedData['created_by'] = Auth::id();

            // Create the task using the validated data
            $task = Task::create($validatedData);

            // Return the created task with a 201 status code
            return response()->json($task, 201);

        } catch (Exception $e) {
            // Return a generic error response
            return response()->json(['error' => 'Task creation failed.'], 500);
        }
    }

    public function storeTaskToLabel(Request $request)
    {

        DB::table('labeled_tasks')
            ->insert([
                'label_id' => $request->labelId,
                'task_id' => $request->taskId,
            ]);

        return response()->json(['message' => "Task created successfully"], 201);
    }

    /**
     * Assign task to user
     */
    public function assignTask(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Please log in!'], 403);
        }
        $validated = $request->validate([
            'task_id' => 'required|integer|exists:tasks,id'
        ]);
        $task = Task::findOrFail($request->task_id);
        if (!$task) {
            return response()->json(['message' => 'Couldn\'t find task'], 404);
        }
        try {
            DB::beginTransaction();

            $assignedTaskExists = UserTask::where('user_id', Auth::id())
                ->where('task_id', $validated['task_id'])
                ->exists();

            if ($assignedTaskExists) {
                return response()->json(['message' => 'Cannot assign twice to the same task!'], 422);
            }

            UserTask::create([
                'task_id' => $validated['task_id'],
                'user_id' => Auth::id()
            ]);

            DB::commit();

            return response()->json(['message' => 'Task assigned successfully!'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while assigning the task.'], 500);
        }
    }


    public function removeAssignee($id)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Please log in!'], 403);
        }

        // Check if the user is already assigned to the task
        $assignedTask = UserTask::where('user_id', '=', Auth::id())
            ->where('task_id', $id)
            ->first();

        if (!$assignedTask) {
            return response()->json(['message' => 'User is not assigned to this task!',], 422);
        }

        // Remove the assignment
        $assignedTask->forceDelete();

        return response()->json(['message' => 'Assignee removed successfully!'], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTaskRequest $request)
    {
        // Validate the incoming request
        $validatedData = $request->validated();

        try {
            DB::transaction(function () use ($validatedData) {

                // Check if task id is provided
                if (!isset($validatedData['id'])) {
                    throw new \Exception('Task ID is required for updating!', 422);
                }
                // Find the task by its ID
                $task = Task::findOrFail($validatedData['id']);

                // Check if requested user is task owner
                if (!$task->created_by === Auth::id()) {
                    throw new \Exception('Cannot edit other people\'s tasks!', 422);
                }

                // Check if the task belongs to the specified project
                if ($task->project_id !== $validatedData['project_id']) {
                    throw new \Exception('This task doesn\'t belong to this project!', 422);
                }

                // Update the task with new data from the request
                $task->update($validatedData); // Directly use the validated data

                // Logging the successful update
                Log::info('Task updated successfully', ['task' => $task]);
            });

            return response()->json(['message' => 'Task updated successfully!'], 201);
        } catch (\Exception $e) {
            // Detailed logging of the exception
            Log::error('Error updating task', [
                'error' => $e->getMessage(),
                'code' => $e->getCode(),
                'trace' => $e->getTraceAsString()
            ]);

            // Return an error response
            $status = $e->getCode() === 422 ? 422 : 500;
            return response()->json(['message' => $e->getMessage()], $status);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $task = Task::where('id', '=', $request->task_id)->where('project_id', '=', $request->project_id)->first();
        if (!$task) {
            return response()->json(['message' => "Cannot remove this task!"], 422);
        }
        if (!$task->created_by === Auth::id()) {
            throw new \Exception('Cannot delete other people\'s task!', 422);
        }
        $task->delete();

        return response()->json(['message' => "Task deleted successfully!"], 201);
    }

    public function updateTaskLabel(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'newLabel' => 'required|exists:labels,id',
            'projectId' => 'required|exists:projects,id'
        ], [
            'projectId.exists' => 'Cannot edit this project tasks!',
        ]);

        // Dispatch the job to the queue
        try {
            DB::transaction(function () use ($id, $request) {
                // Find the task
                $task = Task::find($id);
                if (!$task) {
                    throw new \Exception('Task not found');
                }
                if ($task->project_id != $request->projectId) {
                    throw new \Exception('Cannot edit this task');
                }
                // Update the labeled_task record
                $updated = DB::table('labeled_tasks')
                    ->where('task_id', $task->id)
                    ->update(['label_id' => $request->newLabel]);
                $currentLabel = DB::table('labeled_tasks')
                    ->where('task_id', $task->id)
                    ->value('label_id');

                if ($currentLabel == $request->newLabel) {
                    // Task is already in the requested label, return early
                    return response()->json(null, 204); // No Content
                }
                if (!$updated) {
                    throw new \Exception('Failed to update task label');
                }
            });
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to dispatch task status change job', 'error' => $e->getMessage()], 500);
        }
        return response()->json(['message' => 'Task status changed successfully'], 200);

    }
}
