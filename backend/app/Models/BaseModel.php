<?php

namespace App\Models;

use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    use HasFactory;

    protected function serializeDate(DateTimeInterface $date)
    {
        return Carbon::instance($date)->format('Y-m-d H:i:s');
    }
}
