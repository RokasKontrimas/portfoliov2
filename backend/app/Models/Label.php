<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Label extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'project_id',
    ];

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, 'labeled_tasks', 'label_id', 'task_id');
    }

}
