<?php

namespace Database\Seeders;

use App\Models\Label;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Task;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::pluck('id')->toArray();
        $projects = Project::pluck('id')->toArray();
        foreach (range(1, 1000) as $index) {
            Task::create([
                'title' => $faker->sentence,
                'description' => substr($faker->paragraph, 0, 255),
                'project_id' => $faker->randomElement($projects),
                'priority' => $faker->numberBetween(1, 4),
                'due_date' => $faker->dateTimeBetween('now', '+1 month'),
                'created_by' => $faker->randomElement($users),
            ]);
        }

        // Get labels and tasks for project_id 1
        $labels = Label::where('project_id', 1)->pluck('id')->toArray();
        $tasks = Task::where('project_id', 1)->pluck('id')->toArray();

        // Attach labels to tasks
        foreach ($tasks as $key => $taskId) {
            DB::table('labeled_tasks')->insert([
                'label_id' => $faker->randomElement($labels),
                'task_id' => $taskId,
            ]);
        }

    }
}
