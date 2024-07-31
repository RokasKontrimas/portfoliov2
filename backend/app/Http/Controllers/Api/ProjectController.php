<?php

namespace app\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Models\Project;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Traits\AttributeHandler;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    use AttributeHandler;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {

        $projectModel = new Project();

        // Process relationships
        $validRequestedRelationships = $this->processRelationships($request, $projectModel);

        // Get pagination and sorting parameters
        [$perPage, $sortColumn, $sortDirection] = $this->getPaginationAndSortingParams($request, $projectModel);

        $query = Project::withTrashed()->with($validRequestedRelationships)
            ->orderBy($sortColumn, $sortDirection);


        $projects = $query->paginate($perPage);
        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {

        try {
            // This will throw a validation exception if the data is not valid
            $validatedData = $request->validated();

            // Attach the authenticated user's ID as the creator of the task
            $validatedData['created_by'] = Auth::id();

            // Create the task using the validated data
            $project = Project::create($validatedData);

            // Return the created task with a 201 status code
            return response()->json($project, 201);

        } catch (Exception $e) {
            // Return a generic error response
            return response()->json(['error' => 'Project creation failed.'], 500);
        }

    }

    /**
     * Display the specified resource.
     */

        public function show(Request $request, int $id): JsonResponse
    {
        $projectModel = new Project();

        // Process relationships
        $validRequestedRelationships = $this->processRelationships($request, $projectModel);

        // Get pagination and sorting parameters
        [$perPage, $sortColumn, $sortDirection] = $this->getPaginationAndSortingParams($request, $projectModel);

        $query = Project::withTrashed()->with($validRequestedRelationships)
            ->orderBy($sortColumn, $sortDirection);


        $project = $query->findOrFail($id);

        return response()->json($project);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProjectRequest $request, $id)
    {
        // Retrieve the project by ID
        $project = Project::findOrFail($id);

        // Retrieve the validated data from the request
        $validated = $request->validated();

        // Update the project with the validated data
        $project->update($validated);

        // Optionally, return a response or redirect
        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Retrieve the project by ID
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json([
            'message' => 'Project removed successfully',
            'project' => $project
        ]);
    }
}
