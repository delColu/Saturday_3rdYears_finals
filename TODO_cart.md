# Cart Index Implementation Plan

## Overview
Full cart functionality: add from shop, view/update/remove items, checkout → copy to Order → payments.

## Steps

### 1. [x] Create CartsController.php
- `php artisan make:controller CartsController`
- Methods: index, store, update, destroy, checkout.

### 2. [x] Add cart routes to web.php
- Resource + checkout POST.

### 3. [x] Update Cart model with relations/accessors

### 4. [x] Implement Carts/index.jsx (cart table, totals, checkout)

### 5. [x] Update ProductCard.jsx (add to cart button)

### 6. [x] Test full flow
- Add items from /shop
- View /carts
- Update/remove
- Checkout → new Order + /payments

**Progress: 6/6** ✅

## Bug Fixes
- [x] Fixed: Adding existing cart item now increments quantity instead of resetting to 1 (via proper firstOrCreate + increment logic in CartsController::store)

*Updated after steps.*

