<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;

class OrdersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        $query = Order::with(['user', 'order_items.product']);
        if ($isCustomer) {
            $query->where('user_id', $user->id);
        }

        return Inertia::render('Orders/index', [
            'orders' => $query->paginate(10)
        ]);

    }
}
