<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
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
            'total_amount' => fake()->randomFloat(2, 50, 2000),
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered']),
            'placed_at' => now()->subDays(fake()->numberBetween(1, 30)),
            'shipped_at' => null,
            'delivered_at' => null,
            'paid_at' => null,
        ];
    }
}
