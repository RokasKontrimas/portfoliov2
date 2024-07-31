<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'created_by'
    ];

    public function labels(): HasMany
    {
        return $this->hasMany(Label::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function assignees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_tasks');
    }
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
