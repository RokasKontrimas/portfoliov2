<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('labeled_tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('label_id');
            $table->unsignedBigInteger('task_id');
            $table->foreign('label_id')->references('id')->on('labels')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('labeled_tasks');
    }
};
