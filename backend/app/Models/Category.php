<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name',
        'project_id',
        'created_by'
    ];

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'task_category');
    }
}
