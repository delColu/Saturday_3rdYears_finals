<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $accountType = $user->account?->account_type ?? 'customer';

        $query = Review::with(['product', 'user']);

        if ($accountType !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $reviews = $query->paginate(10);

        return Inertia::render('Review/index', [
            'reviews' => $reviews,
            'isAdmin' => $accountType === 'admin',
        ]);
    }

    public function create()
    {
        return Inertia::render('Review/create', [
            'products' => Product::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $validated['user_id'] = $request->user()->id;

        Review::create($validated);

        return redirect()->route('reviews.index');
    }

    public function edit(Request $request, Review $review)
    {
        if ($request->user()->id !== $review->user_id && $request->user()->account?->account_type !== 'admin') {
            abort(403);
        }

        return Inertia::render('Review/edit', [
            'review' => $review->load('product'),
            'products' => Product::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Review $review)
    {
        if ($request->user()->id !== $review->user_id && $request->user()->account?->account_type !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review->update($validated);

        return redirect()->route('reviews.index');
    }

    public function destroy(Request $request, Review $review)
    {
        if ($request->user()->id !== $review->user_id && $request->user()->account?->account_type !== 'admin') {
            abort(403);
        }

        $review->delete();

        return redirect()->route('reviews.index');
    }
}

