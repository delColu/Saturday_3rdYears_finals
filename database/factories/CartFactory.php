<?php

namespace Database\Factories;

use App\Models\Cart;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Cart>
 */
class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()?->id,
            'quantity' => fake()->numberBetween(1, 20),
            'status' => fake()->randomElement(['active', 'abandoned']),
            'expires_at' => now()->addDays(fake()->numberBetween(1, 30)),
        ];
    }
}
