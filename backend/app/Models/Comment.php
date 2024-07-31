<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends BaseModel
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'user_id',
        'task_id',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the task that the comment belongs to.
     */
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
