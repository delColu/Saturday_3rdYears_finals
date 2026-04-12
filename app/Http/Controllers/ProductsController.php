<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        return Inertia::render('Products/index', [
            'products' => Product::with('category')
                ->when($search, function ($query, $search) {
                    return $query->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('description', 'LIKE', "%{$search}%");
                })
                ->paginate(10),
            'search' => $search,
        ]);
    }

    public function create()
    {
        // Admin middleware already protects this route

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

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
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
            $validated['image'] = $request->file('image')->store('pictures', 'public');
        }

        $product->update($validated);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }

    public function shopIndex(Request $request)
    {
        $search = $request->search;
        $categoryId = $request->category_id;

        $categories = Category::select('id', 'name')->get();

        $products = Product::with('category')
            ->where('status', 'available')
            ->when($categoryId, function ($query, $categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->when($search, function ($query, $search) {
                return $query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            })
            ->paginate(12);

        return Inertia::render('Products/index_customer', [
            'products' => $products,
            'categories' => $categories,
            'search' => $search,
            'selectedCategory' => $categoryId,
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

