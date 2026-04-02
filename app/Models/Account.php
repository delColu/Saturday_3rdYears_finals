<?php

namespace App\Models;

use Database\Factories\AccountFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Account extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'account_type',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
