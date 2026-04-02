<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_id' => \App\Models\Account::inRandomOrder()->first()?->id ?? \App\Models\Account::factory(),
            'order_id' => \App\Models\Order::inRandomOrder()->first()?->id ?? \App\Models\Order::factory(),
            'amount' => fake()->randomFloat(2, 10, 5000),
            'payment_method' => fake()->randomElement(['credit_card', 'paypal', 'bank_transfer']),
            'status' => fake()->randomElement(['pending', 'completed', 'failed']),
        ];
    }
}
