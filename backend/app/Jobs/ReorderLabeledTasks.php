<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class ReorderLabeledTasks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected int $labelId;
    protected int $startNumber;

    /**
     * Create a new job instance.
     *
     * @param int $labelId
     * @param int $startNumber
     */
    public function __construct(int $labelId, int $startNumber)
    {
        $this->labelId = $labelId;
        $this->startNumber = $startNumber;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        DB::transaction(function () {
            $tasks = DB::table('labeled_task')
                ->select('task_id', 'label_id')
                ->where('label_id', $this->labelId)
                ->orderBy('order')
                ->get();

            $start = $this->startNumber;
            $updates = [];

            foreach ($tasks as $task) {
                $updates[] = [
                    'task_id' => $task->task_id,
                    'label_id' => $task->label_id,
                    'order' => $start,
                ];
                $start++;
            }

            foreach ($updates as $update) {
                DB::table('labeled_task')
                    ->where('task_id', $update['task_id'])
                    ->where('label_id', $update['label_id'])
                    ->update(['order' => $update['order']]);
            }
        });
    }
}
