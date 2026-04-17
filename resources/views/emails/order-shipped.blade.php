<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Order #{{ $order->id }} Has Been Shipped!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; }
        .details { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
        ul { margin: 0; padding-left: 20px; }
        strong { color: #1f2937; }
    </style>
</head>
<body>
    <h1>Your Order #{{ $order->id }} Has Been Shipped!</h1>

    <p>Hello {{ $order->user->first_name ?? 'Customer' }},</p>

    <p>Great news! Your order has been shipped.</p>

    <div class="details">
        <h3>Order Details:</h3>
        <ul>
            <li><strong>ID:</strong> {{ $order->id }}</li>
            <li><strong>Total:</strong> ${{ number_format($order->total_amount, 2) }}</li>
            <li><strong>Shipped At:</strong> {{ $order->shipped_at ?? \Carbon\Carbon::now()->format('M d, Y') }}</li>
        </ul>
    </div>

    @if($order->order_items && $order->order_items->count() > 0)
    <div class="details">
        <h3>Items:</h3>
        <ul>
            @foreach($order->order_items as $item)
            <li>{{ $item->product->name ?? 'Product' }} (Qty: {{ $item->quantity }})</li>
            @endforeach
        </ul>
    </div>
    @endif

    <p>Thank you for shopping with us!</p>

    <p>Cheers,<br>{{ config('app.name') }}</p>
</body>
</html>

