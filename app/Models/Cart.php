<?php

namespace App\Models;

use Database\Factories\CartFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = [
        'user_id',
        'quantity',
        'status',
        'expires_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
