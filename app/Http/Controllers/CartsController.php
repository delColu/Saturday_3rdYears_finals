<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Cart_items;
use App\Models\Order;
use App\Models\Order_items;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartsController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        $cart = Cart::where('user_id', $userId)
            ->where('status', 'active')
            ->with('cart_items.product')
            ->first();

        if (!$cart) {
            return Inertia::render('Carts/index', [
                'cart' => null,
                'cartItems' => [],
                'total' => 0
            ]);
        }

        $total = $cart->cart_items->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return Inertia::render('Carts/index', [
            'cart' => $cart,
            'cartItems' => $cart->cart_items,
            'total' => $total
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'sometimes|integer|min:1|max:999'
        ]);

        $userId = Auth::id();
        $product = Product::findOrFail($request->product_id);
        $qty = $request->integer('quantity', 1);

        $cart = Cart::firstOrCreate(
            [
                'user_id' => $userId,
                'status' => 'active'
            ],
            [
                'quantity' => 0,
                'expires_at' => now()->addDays(30)
            ]
        );

        $cartItem = Cart_items::firstOrCreate(
            [
                'cart_id' => $cart->id,
                'product_id' => $product->id
            ],
            ['quantity' => $qty]
        );

        if ($cartItem->wasRecentlyCreated) {
            // New item - already set to $qty
        } else {
            // Existing - increment by $qty
            $cartItem->increment('quantity', $qty);
        }

        return redirect()->route('carts.index')->with('message', 'Product added to cart!');
    }

    public function update(Request $request, Cart_items $cart_items)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        if ($cart_items->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cart_items->update(['quantity' => $request->quantity]);

        return back()->with('message', 'Cart updated!');
    }

    public function destroy(Request $request, $id)
    {
        $cart_items = Cart_items::findOrFail($id);

        if ($cart_items->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cart_items->delete();

        return back()->with('message', 'Item removed from cart!');
    }

    public function checkout(Request $request)
    {
        $userId = Auth::id();
        $cart = Cart::where('user_id', $userId)
            ->where('status', 'active')
            ->with('cart_items.product')
            ->firstOrFail();

        if ($cart->cart_items->isEmpty()) {
            return redirect()->route('carts.index')->with('error', 'Cart is empty!');
        }

        // Create Order
        $total = $cart->cart_items->sum(fn($item) => $item->quantity * $item->product->price);

        $order = Order::create([
            'user_id' => $userId,
            'total_amount' => $total,
            'status' => 'pending'
        ]);

        // Copy items to order_items
        foreach ($cart->cart_items as $item) {
            Order_items::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price // snapshot price
            ]);
        }

        // Deactivate cart
        $cart->update(['status' => 'completed']);

        return redirect()->route('payments.confirm', $order->id)->with('message', 'Review and confirm your payment.');
    }
}

