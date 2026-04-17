<?php

namespace App\Observers;

use App\Models\Product;

class ProductObserver
{
    /**
     * Handle the Product "saving" event to prevent negative stock.
     */
    public function saving(Product $product): void
    {
        if ($product->stock < 0) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'stock' => 'Product stock cannot be negative.',
            ]);
        }
    }
}
