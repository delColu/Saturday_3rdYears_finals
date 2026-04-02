<?php

namespace Database\Factories;

use App\Models\Cart_items;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Cart_items>
 */
class CartItemsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cart_id' => \App\Models\Cart::inRandomOrder()->first()?->id ?? \App\Models\Cart::factory(),
            'product_id' => \App\Models\Product::inRandomOrder()->first()?->id ?? \App\Models\Product::factory(),
            'quantity' => fake()->numberBetween(1, 10),
        ];
    }
}
