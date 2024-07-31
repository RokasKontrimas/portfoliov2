<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Seeder;

class UserTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Retrieve all users
        $users = User::all();

        // Define the maximum number of tasks per user
        $maxTasksPerUser = 5;

        // Iterate over each user
        foreach ($users as $user) {
            // Generate a random number of tasks for the user
            $numberOfTasks = rand(1, $maxTasksPerUser);

            // Retrieve random tasks from the database
            $tasks = Task::inRandomOrder()->limit($numberOfTasks)->get();

            // Associate the tasks with the user
            $user->tasks()->attach($tasks);
        }
    }
}
