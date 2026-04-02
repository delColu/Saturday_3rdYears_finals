<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test Customer
        $testCustomer = User::create([
            'first_name' => 'test',
            'last_name' => 'Customer',
            'email' => 'testcustomer@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
        $testCustomer->account()->create([
            'account_type' => 'customer',
            'status' => 'active',
        ]);

        // Create test Admin
        $testAdmin = User::create([
            'first_name' => 'test',
            'last_name' => 'Admin',
            'email' => 'testadmin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
        $testAdmin->account()->create([
            'account_type' => 'admin',
            'status' => 'active',
        ]);

        // Create test SuperAdmin
        $testSuperAdmin = User::create([
            'first_name' => 'test',
            'last_name' => 'SuperAdmin',
            'email' => 'testsuperadmin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
        $testSuperAdmin->account()->create([
            'account_type' => 'super admin',
            'status' => 'active',
        ]);

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            AccountSeeder::class,
            CartSeeder::class,
            CartItemsSeeder::class,
            OrderSeeder::class,
            OrderItemsSeeder::class,
            PaymentSeeder::class,
        ]);
    }
}
