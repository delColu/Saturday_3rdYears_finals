<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Order;


class PaymentsController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        $query = Payment::with(['account.user', 'order']);
        if ($isCustomer) {
            $query->whereHas('account.user', function($q) use ($user) {
                $q->where('id', $user->id);
            });
        }

        return Inertia::render('Payments/index', [
            'payments' => $query->paginate(10)
        ]);
    }

    /**
     * Display the specified payment for editing (admin).
     */
    public function show(Payment $payment)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        if ($isCustomer && $payment->account->user_id !== $user->id) {
            abort(403);
        }

        $payment->load(['account.user', 'order.order_items.product']);

        return Inertia::render('Payments/edit', [
            'payment' => $payment
        ]);
    }

    /**
     * Display the specified payment for viewing (customer/admin).
     */
    public function view(Payment $payment)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        if ($isCustomer && $payment->account->user_id !== $user->id) {
            abort(403);
        }

        $payment->load(['account.user', 'order.order_items.product']);

        return Inertia::render('Payments/show', [
            'payment' => $payment
        ]);
    }

    /**
     * Update the specified payment.
     */
    public function update(Request $request, Payment $payment)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        if ($isCustomer && $payment->account->user_id !== $user->id) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:pending,success,failed,refunded'
        ]);

        $payment->update($request->only('status'));

        return redirect()->route('payments.index')->with('success', 'Payment updated successfully.');
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
            'payment_method' => 'required|string|in:card,paypal,bank,cash',
            'order_id' => 'required|exists:orders,id',
        ]);

        $user = auth()->user();
        if (Order::findOrFail($request->order_id)->user_id !== $user->id) {
            abort(403);
        }

        // DEMO: Instant payment success for demo purposes (no real gateway)
        if (!$user->account) {
            $user->account()->create([
                'account_type' => 'Customer',
                'status' => 'active',
            ]);
        }

        $order = Order::findOrFail($request->order_id);

        Payment::create([
            'account_id' => $user->account->id,
            'order_id' => $order->id,
            'amount' => $order->total_amount,
            'payment_method' => $request->payment_method,
            'status' => 'success',
        ]);

        Order::where('id', $request->order_id)->update(['status' => 'paid']);

        return redirect()->route('payments.index')->with('message', 'Payment successful!');
    }

    /**
     * Preview the shipped email for an order (admin only).
     */
    public function previewEmail(Order $order)
    {
        $user = auth()->user();
        $isCustomer = $user && $user->account && $user->account->account_type === 'customer';

        if ($isCustomer && $order->user_id !== $user->id) {
            abort(403);
        }

        $order->load(['user', 'order_items.product']);

        return Inertia::render('Payments/email', [
            'order' => $order
        ]);
    }
}
