<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use Faker\Factory as Faker;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Get existing user IDs
        $userIds = \App\Models\User::pluck('id')->toArray();
        $tasks = Task::pluck('id')->toArray();

        foreach (range(1, 679) as $index) {
            Comment::create([
                'comment' => substr($faker->paragraph, 0, 255),
                'user_id' => $faker->randomElement($userIds),
                'task_id' => $faker->randomElement($tasks),
            ]);
        }
    }
}
