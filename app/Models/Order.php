<?php

namespace App\Models;

use Database\Factories\OrderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',
        'total_amount',
        'status',
        'placed_at',
        'shipped_at',
        'delivered_at',
        'paid_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
