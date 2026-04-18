<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageOptions = ['pictures/Apple.jpg', 'pictures/Bananas.jpg', 'pictures/Mangos.jpg'];

        return [
            'category_id' => \App\Models\Category::inRandomOrder()->first()?->id ?? \App\Models\Category::factory(),
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 10, 1000),
            'stock' => fake()->numberBetween(0, 100),
            'image' => $imageOptions[array_rand($imageOptions)]
        ];
    }
}
