<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Work',
            'Personal',
            'Home',
            'Health',
            'Education',
            'Finance',
            'Social',
            'Shopping',
            'Travel',
            'Project specific',
        ];
        foreach ($categories as $category) {
            Category::create([
                'name' => $category
            ]);
        }

    }
}
