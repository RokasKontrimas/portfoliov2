<?php

namespace App\Traits;

use App\Helpers\RelationshipHelper;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

trait AttributeHandler
{
    protected function processRelationships(Request $request, Model $model): array
    {
        $existingRelationships = RelationshipHelper::getAllRelationships($model);
        $requestedRelationships = $request->query('_embed', []);

        if (!is_array($requestedRelationships)) {
            // Return an array or some value that the controller can handle
            return ['error' => 'Relationships must be in array!', 'status' => 400];
        }

        return array_filter($requestedRelationships, function ($relationship) use ($existingRelationships) {
            return in_array($relationship, $existingRelationships);
        });
    }

    /**
     * Get pagination and sorting parameters.
     */
    protected function getPaginationAndSortingParams(Request $request, Model $model): array
    {
        $perPage = (int)$request->query('per_page', 20);

        $fillableFields = $model->getFillable();
        $defaultSortColumn = 'id';
        $sortColumn = $request->query('_sort', $defaultSortColumn);

        if (!in_array($sortColumn, $fillableFields)) {
            // Fallback to default sort column if the requested column is not valid
            Log::warning("Invalid sort column requested: $sortColumn. Defaulting to $defaultSortColumn.");
            $sortColumn = $defaultSortColumn;
        }

        $sortDirection = $request->query('_order', 'asc');
        if (!in_array($sortDirection, ['asc', 'desc'])) {
            $sortDirection = 'asc';
        }

        return [$perPage, $sortColumn, $sortDirection];
    }
}
