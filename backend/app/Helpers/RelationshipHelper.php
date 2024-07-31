<?php
namespace App\Helpers;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Log;
use ReflectionClass;
use ReflectionMethod;

class RelationshipHelper
{

    /**
     * Get all relationship methods of a given model.
     *
     * @param Model $model
     * @return array
     * @throws \ReflectionException
     */
    public static function getAllRelationships(Model $model):array
    {
        $relationships = [];
        $reflector = new ReflectionClass($model);

        foreach ($reflector->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            if ($method->class === get_class($model) && $method->getNumberOfParameters() === 0) {
                try {
                    $relationships[] = $method->getName();
                } catch (\Exception $e) {
                    Log::error("Error occurred while retrieving return type of a method: {$e->getMessage()}");
                }
            }
        }

        return $relationships;
    }
}
