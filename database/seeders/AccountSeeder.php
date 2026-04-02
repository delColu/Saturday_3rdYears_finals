<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Special 3 accounts
        $users = \App\Models\User::inRandomOrder()->limit(3)->get();
        \App\Models\Account::create([
            'user_id' => $users[0]?->id,
            'account_type' => 'Customer',
            'status' => 'active',
        ]);
        \App\Models\Account::create([
            'user_id' => $users[1]?->id,
            'account_type' => 'Admin',
            'status' => 'active',
        ]);
        \App\Models\Account::create([
            'user_id' => $users[2]?->id,
            'account_type' => 'Super_Admin',
            'status' => 'active',
        ]);
    }
}
