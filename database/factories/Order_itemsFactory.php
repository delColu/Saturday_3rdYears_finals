<?php

namespace Database\Factories;

use App\Models\Order_items;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order_items>
 */
class Order_itemsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => \App\Models\Order::inRandomOrder()->first()?->id ?? \App\Models\Order::factory(),
            'product_id' => \App\Models\Product::inRandomOrder()->first()?->id ?? \App\Models\Product::factory(),
            'quantity' => fake()->numberBetween(1, 5),
            'price' => fake()->randomFloat(2, 10, 1000),
        ];
    }
}
