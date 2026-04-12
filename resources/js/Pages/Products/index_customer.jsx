import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';
import { useState, useEffect, useCallback } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function ProductsIndexCustomer({ search: initialSearch }) {
    const { products, auth, categories, selectedCategory } = usePage().props;
    const [search, setSearch] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        setSearch(initialSearch || '');
    }, [initialSearch]);

    useEffect(() => {
        setSelectedCategoryId(selectedCategory || '');
    }, [selectedCategory]);

    const getCurrentPage = () => {
        const url = new URL(window.location.href);
        return parseInt(url.searchParams.get('page')) || 1;
    };

    const debouncedFilter = useCallback(debounce((searchValue, categoryValue) => {
        const currentPage = getCurrentPage();
        router.get(route('shop.index'), {
            search: searchValue || null,
            category_id: categoryValue || null,
            page: currentPage
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, 300), []);

    useEffect(() => {
        debouncedFilter(search, selectedCategoryId);
    }, [search, selectedCategoryId, debouncedFilter]);

    // Optional: Redirect admin to /products
    if (auth.user?.account?.account_type === 'admin') {
        router.visit(route('products.index'));
        return null;
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Shop
                </h2>
            }
        >
            <Head title="Shop" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-4">Browse Our Products</h3>
                                <div className="flex gap-4 items-end max-w-2xl">
                                    <div className="flex-1 max-w-md">
                                        <InputLabel value="Search products..." className="sr-only" />
                                        <div className="relative">
                                            <TextInput
                                                type="text"
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    debouncedFilter(e.target.value, selectedCategoryId);
                                                }}
                                                placeholder="Search products by name or description..."
                                                className="w-full pr-10"
                                            />
                                            {search && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const currentPage = getCurrentPage();
                                                        setSearch('');
                                                        debouncedFilter('', selectedCategoryId);
                                                    }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 max-w-md">
                                        <InputLabel value="Filter by category" className="sr-only" />
                                        <select
                                            value={selectedCategoryId}
                                            onChange={(e) => {
                                                setSelectedCategoryId(e.target.value);
                                                debouncedFilter(search, e.target.value);
                                            }}
                                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">All Categories</option>
                                            {categories?.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedCategoryId && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const currentPage = getCurrentPage();
                                                    setSelectedCategoryId('');
                                                    debouncedFilter(search, '');
                                                }}
                                                className="mt-1 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                                            >
                                                Clear Category Filter
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {products?.data?.length > 0 ? (
                                <>
                                    {/* Product Cards Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                        {products.data.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {products.last_page > 1 && (
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={route('shop.index', {
                                                        page,
                                                        ...(search && { search }),
                                                        ...(selectedCategoryId && { category_id: selectedCategoryId })
                                                    })}
                                                    className={`px-3 py-2 rounded font-medium transition-colors ${
                                                        products.current_page == page
                                                            ? 'bg-blue-500 text-white shadow-md'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                    }`}
                                                >
                                                    {page}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">
                                        {search || selectedCategoryId ? 'No products match your search/filter' : 'No products available'}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {search || selectedCategoryId
                                            ? 'Try adjusting your search or filter criteria.'
                                            : 'Check back later for new arrivals.'
                                        }
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

