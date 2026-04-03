# Review Seeding Fix - Plan

## Issue
`Call to undefined method App\Models\Review::factory()` error when seeding reviews.

## Root Cause
`app/Models/Review.php` missing `HasFactory` trait.

## Fix Required
**Edit `app/Models/Review.php`**:

**Add these lines:**
```php
use Illuminate\Database\Eloquent\Factories\HasFactory;
```
```php
use HasFactory;
```

**Complete corrected file:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
```

## Test Steps
1. Apply fix to Review.php
2. Run: `php artisan db:seed --class=ReviewSeeder`
3. Verify 30 reviews created in database

**Status**: Ready to implement
