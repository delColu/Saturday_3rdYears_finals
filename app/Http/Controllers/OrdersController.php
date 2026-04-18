<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderShipped;
use Illuminate\Support\Facades\Log;

class OrdersController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index(Request $request)
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

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        if ($isCustomer && $order->user_id !== $user->id) {
            abort(403);
        }

        $order->load(['user', 'order_items.product']);

        return Inertia::render('Orders/show', [
            'order' => $order,
            'auth' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Show edit form for the specified order (admin only).
     */
    public function edit(Order $order)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        if ($isCustomer && $order->user_id !== $user->id) {
            abort(403);
        }

        $order->load(['user', 'order_items.product']);

        return Inertia::render('Orders/edit', [
            'order' => $order
        ]);
    }

    /**
     * Update the specified order.
     */
    public function update(Request $request, Order $order)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        if ($isCustomer && $order->user_id !== $user->id) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:Pending,Confirmed,Shipped,Delivered,Cancelled'
        ]);

$oldStatus = $order->status;
        $order->update($request->only('status'));

        Log::info('Order status update - ID: ' . $order->id . ', old: ' . $oldStatus . ', new: ' . $request->status);
        $order->load(['user']);
        if ($request->status === 'Shipped' && $oldStatus !== 'Shipped') {
            Log::info('Sending shipped email to ' . $order->user->email . ' for order ' . $order->id);
            Mail::to($order->user->email)->send(new OrderShipped($order));
            Log::info('Shipped email sent for order ' . $order->id);
        }

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }
}
