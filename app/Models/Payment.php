<?php

namespace App\Models;

use Database\Factories\PaymentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'order_id',
        'amount',
        'payment_method',
        'status',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($payment) {
            $order = $payment->order;
            \App\Models\Report::create([
                'user_id' => $order ? $order->user_id : null,
                'action' => 'Payment Made',
                'description' => "Payment for order #{$payment->order_id} amount {$payment->amount} via {$payment->payment_method}, status: {$payment->status}"
            ]);
        });
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}

