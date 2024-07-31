<?php

namespace app\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use App\Traits\AttributeHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;

class CategoryController extends Controller
{
    use AttributeHandler;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $categoryModel = new Category();

        // Proccess relationships
        $validRelationships = $this->processRelationships($request, $categoryModel);

        // Get other parameters
        [$perPage, $sortColumn, $sortDirection] = $this->getPaginationAndSortingParams($request, $categoryModel);
        $query = Category::with($validRelationships)
            ->orderBy($sortColumn, $sortDirection);
        $categories = $query->paginate($perPage);
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            // Validate data
            $validData = $request->validated();
            // Insert current user who creates category
            $validData['created_by'] = Auth::id();
            // Create new category

            $category = Category::create($validData);
            return response()->json($category, 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Cateogry creation failed'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, $id)
    {
        // Get category
        $category = Category::findOrFail($id);

        // Validate data
        $validData = $request->validated();

        // Update current category
        $category->update($validData);

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Get selected category
        $category = Category::findOrFail($id);

        // Soft delete category
        $category->delete();

        return response()->json([
            'message' => 'Category removed successfully',
            'category' => $category
        ]);
    }
}
