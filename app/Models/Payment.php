<?php

namespace App\Models;

use Database\Factories\PaymentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'account_id',
        'amount',
        'payment_method',
        'status',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
