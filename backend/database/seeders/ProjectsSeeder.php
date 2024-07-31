<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create();
        $userIds = User::pluck('id')->toArray();
        foreach (range(1, 10) as $index) {
            Project::create([
                'title'=> $faker->sentence,
                'description' => substr($faker->paragraph, 0, 255),
                'created_by' => $faker->randomElement($userIds)
            ]);
        }
    }
}
