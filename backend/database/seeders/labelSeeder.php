<?php

namespace Database\Seeders;

use App\Models\Label;
use App\Models\Project;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class labelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
//        $projects = Project::pluck('id')->toArray();
        $labels = ['All tasks', 'In progress', 'Done', 'Blocked', 'In preview', 'Completed'];
        foreach ($labels as $key => $label) {
            Label::create([
                'name' => $label,
                'project_id' => 1,
            ]);
        }

    }
}
