<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Order;

class PaymentsController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        $query = Payment::with('account');
        if ($isCustomer) {
            $query->whereHas('account.user', function($q) use ($user) {
                $q->where('id', $user->id);
            });
        }

        return Inertia::render('Payments/index', [
            'payments' => $query->paginate(10)
        ]);
    }

    public function confirm(Order $order)
    {
        $user = auth()->user();
        if ($order->user_id !== $user->id) {
            abort(403);
        }

        $cartItems = $order->order_items()->with('product')->get();

        return Inertia::render('Payments/confirm_payment', [
            'order' => $order,
            'cartItems' => $cartItems
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string|in:card,paypal,bank',
            'order_id' => 'required|exists:orders,id',
        ]);

        $user = auth()->user();
        if (Order::findOrFail($request->order_id)->user_id !== $user->id) {
            abort(403);
        }

        // DEMO: Instant payment success for demo purposes (no real gateway)
        Payment::create([
            'account_id' => $user->account_id,
            'order_id' => $request->order_id,
            'amount' => Order::find($request->order_id)->total_amount,
            'payment_method' => $request->payment_method,
            'status' => 'success',
        ]);

        Order::where('id', $request->order_id)->update(['status' => 'paid']);

        return redirect()->route('payments.index')->with('message', 'Payment successful!');
    }
}
