<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LabelController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('projects/{id}', [ProjectController::class, 'show']);
Route::get('labels', [LabelController::class, 'index']);
Route::get('labels/{id}', [LabelController::class, 'show']);

Route::middleware(['auth:sanctum', 'throttle:10,1'])->group(function () {
    //task
    Route::post('/create-task', [TaskController::class, 'store']);
    Route::post('/insert-labeled-task', [TaskController::class, 'storeTaskToLabel']);
    Route::post('/update-task', [TaskController::class, 'update']);
    Route::post('/task-delete', [TaskController::class, 'destroy']);
    Route::patch('change-status/{id}', [TaskController::class, 'updateTaskLabel']);
    Route::post('/assign-task', [TaskController::class, 'assignTask']);
    Route::delete('/remove-assignee/{id}', [TaskController::class, 'removeAssignee']);
    Route::post('write-comment', [CommentController::class, 'store']);


    //post
    Route::post('create-project', [ProjectController::class, 'update']);
    Route::post('/update-project/{id}', [ProjectController::class, 'update']);
    Route::delete('/delete-project/{id}', [ProjectController::class, 'destroy']);

    //label
    Route::post('create-label', [LabelController::class, 'store']);


});
Route::get('/testexas', function () {
    return response()->json(['loxas' => 'tu']);
});
