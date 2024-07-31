<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        $this->call([
            UserTaskSeeder::class,
            CategoriesSeeder::class,
            ProjectsSeeder::class,
            labelSeeder::class,
            TaskSeeder::class,
            CommentsSeeder::class,
        ]);

         User::create([
             'name' => 'Test User',
             'email' => 'rokas@gmail.com',
             'password' => Hash::make('rokas')
         ]);
    }
}
