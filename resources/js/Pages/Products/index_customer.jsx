import AuthenticatedLayoutCustomer from '@/Layouts/AuthenticatedLayoutCustomer';
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
        <AuthenticatedLayoutCustomer
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
                            {/* Hero Banner */}
                            <div className="relative bg-gradient-to-r from-emerald-400 via-green-400 to-orange-400 rounded-2xl p-8 mb-8 overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-[url('/grocery-store.png')] bg-cover bg-center opacity-20"></div>
                                <div className="relative z-10 text-center text-white">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-pulse">
                                        Fresh Deals Today!
                                    </h1>
                                    <p className="text-xl mb-6 opacity-90 drop-shadow-md">
                                        Discover premium groceries at unbeatable prices. Shop now and save!
                                    </p>
                                    <Link href="#products" className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 shadow-xl hover:scale-105 hover:shadow-2xl">
                                        Browse Products
                                        <svg className="w-6 h-6 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="mb-8">
                            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-600 via-green-600 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">Fresh Groceries Await!</h2>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Browse Our Products</h3>
                                <div className="flex gap-4 items-end max-w-2xl">
                                    <div className="flex-1 max-w-md relative group">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <InputLabel value="Search products..." className="sr-only" />
                                        <div className="relative">
                                            <TextInput
                                                type="text"
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    debouncedFilter(e.target.value, selectedCategoryId);
                                                }}
                                                placeholder="Search fresh fruits, vegetables..."
                                                className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50 dark:focus:ring-emerald-800/50 transition-all shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-700/80"
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
                                    <div className="flex-1 max-w-md relative group">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h14v2H5V4zm0 4h14v2H5V8zm0 4h5v2H5v-2z" />
                                        </svg>
                                        <InputLabel value="Filter by category" className="sr-only" />
                                        <div className="flex items-end gap-2">
                                            <select
                                                value={selectedCategoryId}
                                                onChange={(e) => {
                                                    setSelectedCategoryId(e.target.value);
                                                    debouncedFilter(search, e.target.value);
                                                }}
                                                className="flex-1 pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50 dark:focus:ring-emerald-800/50 transition-all shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-700/80 appearance-none cursor-pointer"
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
                                                    className="w-auto px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm flex items-center gap-1 flex-shrink-0"
                                                >
                                                    <svg className="-ms-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Clear Filter
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {products?.data?.length > 0 ? (
                                <>
                                    {/* Products Section */}
                                    <div id="products" className="mb-12">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                            {products.data.map((product) => (
                                                <div key={product.id} className="group h-full">
                                                    <ProductCard product={product} />
                                                </div>
                                            ))}
                                        </div>
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
                                                    className={`px-4 py-2 mx-1 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                                                        products.current_page == page
                                                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/50'
                                                            : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-gray-200 dark:border-gray-600 hover:border-emerald-300'
                                                    }`}
                                                >
                                                    {page}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-20">
                                    <div className="mx-auto w-32 h-32 mb-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                                        <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4l-8-4M4 7l8 4m0 0l8 4M4 7h16M4 7v12a2 2 0 002 2h12a2 2 0 002-2V7M4 7v12a2 2 0 002 2h12a2 2 0 002-2V7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-400 mb-4">
                                        {search || selectedCategoryId ? 'No products found' : 'Coming Soon!'}
                                    </h3>
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
        </AuthenticatedLayoutCustomer>
    );
}
