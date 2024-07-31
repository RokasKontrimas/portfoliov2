<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'due_date',
        'created_by',
        'project_id',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function labels(): BelongsToMany
    {
        return $this->belongsToMany(Label::class, 'labeled_tasks', 'task_id', 'label_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'task_category');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_tasks', 'task_id', 'user_id');
    }
}
