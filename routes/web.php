<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ReviewsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $categories = \App\Models\Category::select('id', 'name')->get();
    $products = \App\Models\Product::with('category')
        ->where('status', 'available')
        ->limit(8)
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'products' => $products,
        'categories' => $categories,
    ]);
});

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/credits', function () {
    return Inertia::render('credits');
})->name('credits');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin-only routes
    Route::middleware('admin')->group(function () {
        Route::resource('users', UsersController::class);
        Route::resource('products', ProductsController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
        Route::get('/products/{product}/info', [ProductsController::class, 'info'])->name('products.info');
    });

    Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
    Route::get('/products/{product}', [ProductsController::class, 'show'])->name('products.show');

    Route::get('/orders', OrdersController::class)->name('orders.index');
    Route::get('/payments', PaymentsController::class)->name('payments.index');
    Route::post('/payments', [PaymentsController::class, 'store'])->name('payments.store');
    Route::get('/payments/confirm/{order}', [PaymentsController::class, 'confirm'])->name('payments.confirm');
    Route::get('/shop', [ProductsController::class, 'shopIndex'])->name('shop.index');
    Route::resource('carts', \App\Http\Controllers\CartsController::class);
    Route::post('/carts/checkout', [\App\Http\Controllers\CartsController::class, 'checkout'])->name('carts.checkout');
    Route::resource('reviews', ReviewsController::class);
});

require __DIR__.'/auth.php';
