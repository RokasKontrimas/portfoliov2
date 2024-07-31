<?php

namespace app\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLabelRequest;
use App\Models\Label;
use App\Models\Project;
use App\Traits\AttributeHandler;
use Illuminate\Http\Request;
use Mockery\Exception;

class LabelController extends Controller
{
    use AttributeHandler;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $labelModel = new Label();

        // Proccess relationships
        $validRelationships = $this->processRelationships($request, $labelModel);

        // Get other parameters
        [$perPage, $sortColumn, $sortDirection] = $this->getPaginationAndSortingParams($request, $labelModel);
        $query = Label::with($validRelationships)
            ->orderBy($sortColumn, $sortDirection);
        $categories = $query->paginate($perPage);
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLabelRequest $request)
    {
        try {
            // Get validated label
            $validData = $request->validated();
            $validData['order'] = 1;
            // Create new label
            Label::create($validData);

            return response()->json(['message' => 'Label created successfully'], 201);

        } catch (Exception $e) {
            return response()->json(['error' => 'Cateogry creation failed'], 500);
        }

    }

    public function show(Request $request, int $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['error' => 'Not Found'], 404);
        }

        // Process relationships
        $labelModel = new Label();
        $validRequestedRelationships = $this->processRelationships($request, $labelModel);

        // Get pagination and sorting parameters
        [$perPage, $sortColumn, $sortDirection] = $this->getPaginationAndSortingParams($request, $labelModel);

        // Query labels with tasks and assignees
        $labels = Label::withTrashed()
            ->with($validRequestedRelationships) // Eager load dynamic relationships
            ->where('project_id', $id)
            ->orderBy($sortColumn, $sortDirection)
            ->get();

        // Eager load tasks and assignees directly
        $labels->load(['tasks.assignees', 'tasks.comments.user']);

        return response()->json(['labels' => $labels, "projectTitle" => $project->title], 200);
    }


    public function test(Request $request)
    {
        // Fetch labels based on project ID
        $labels = Label::where('project_id', $request->projectId)->get();

        // Initialize an array to store tasks and assignees
        $tasksAndAssignees = [];

        // Loop through each label to fetch tasks and assignees
        foreach ($labels as $label) {
            // Fetch tasks associated with the current label
            $tasks = $label->tasks()->with('assignees')->get();

            // Prepare array to store tasks and their assignees
            $tasksAndAssignees[$label->id] = [
                'label' => $label,
                'tasks' => $tasks,
            ];
        }

        // Now $tasksAndAssignees array contains tasks and assignees for each label based on the project ID
        // You can further process or return $tasksAndAssignees as needed
        return response()->json($tasksAndAssignees);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(StoreLabelRequest $request, $id)
    {
        // Get label
        $label = Label::findOrFail($id);

        // Validate data
        $validData = $request->validated();

        // Update current label
        $label->update($validData);

        return response()->json([
            'message' => 'Label updated successfully',
            'label' => $label
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $label = Label::findOrFail($id);
        $label->delete();
        return response()->json([
            'message' => 'Label removed successfully',
            'label' => $label
        ]);
    }
}
