<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;

class ProductsController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/index', [
            'products' => Product::with('category')->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/create', [
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:available,unavailable',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($validated);

        return redirect()->route('products.index');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/edit', [
            'product' => $product->load('category'),
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:available,unavailable',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // TODO: Delete old image
            $validated['image'] -> $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }

    public function shopIndex()
    {
        return Inertia::render('Products/index_customer', [
            'products' => Product::with('category')
                ->where('status', 'available')
                ->paginate(12)
        ]);
    }

    public function show(Product $product)
    {
        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'available')
            ->take(4)
            ->get();

        return Inertia::render('Products/info', [
            'product' => $product->load('category', 'reviews.user'),
            'relatedProducts' => $relatedProducts
        ]);
    }
}

