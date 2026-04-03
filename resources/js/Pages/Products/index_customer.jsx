import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';

export default function ProductsIndexCustomer() {
    const { products, auth } = usePage().props;

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
                            {products?.data?.length > 0 ? (
                                <>
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-4">Browse Our Products</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Discover amazing products available now.
                                        </p>
                                    </div>

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
                                                    href={route('shop.index', `?page=${page}`)}
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
                                    <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">No products available</p>
                                    <p className="text-gray-600 dark:text-gray-400">Check back later for new arrivals!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

