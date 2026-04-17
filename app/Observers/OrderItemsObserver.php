<?php

namespace App\Observers;

use App\Models\Order_items;

class OrderItemsObserver
{
    /**
     * Handle the Order_items "created" event.
     */
    public function created(Order_items $orderItem): void
    {
$orderItem->product->decrement('stock', $orderItem->quantity);
        $orderItem->product->refresh();
        if ($orderItem->product->stock <= 0) {
            $orderItem->product->update(['status' => 'unavailable']);
        }
    }
}
