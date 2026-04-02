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
        return Inertia::render('Orders/index', [
            'orders' => Order::with(['user', 'order_items.product'])->paginate(10)
        ]);
    }
}
