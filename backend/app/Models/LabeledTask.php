<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabeledTask extends BaseModel
{
    use HasFactory,SoftDeletes;

    protected $table = 'labeled_tasks';

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function label(): BelongsTo
    {
        return $this->belongsTo(Label::class);
    }
}
