import AuthenticatedLayoutCustomer from '@/Layouts/AuthenticatedLayoutCustomer';
import { Head, Link, usePage, router } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function DashboardCustomer({ user, featuredProducts }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayoutCustomer
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Welcome back, {user.first_name} {user.last_name}!
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-fruit-orange-500 to-fruit-green-600 rounded-xl shadow-2xl overflow-hidden mb-12 p-12 text-white text-center border-4 border-lime-500">
                        <ApplicationLogo className="mx-auto mb-6 w-24 h-24 rounded-full shadow-lg" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            🍎 Fresh Fruits Market - Farm Fresh Produce Delivered! 🍌
                        </h1>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                            Discover the best seasonal fruits, premium vegetables, and organic produce.
                            Shop now and enjoy fresh flavors every day! 🥭🍊🥝
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={route('shop.index')}
                                className="bg-fruit-yellow-banana hover:bg-fruit-orange-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                🍓 Shop Fresh Fruits
                            </Link>
                            <Link
                                href={route('carts.index')}
                                className="bg-fruit-green-500 hover:bg-fruit-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                🛒 View Cart
                            </Link>
                        </div>
                    </div>

                    {/* Featured Products */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Featured Products</h3>
                            <p className="text-gray-600 dark:text-gray-400">Check out these hand-picked items just for you</p>
                        </div>
                        <div className="p-8">
                            {featuredProducts && featuredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {featuredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">No featured products yet</p>
                                    <Link
                                        href={route('shop.index')}
                                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                                    >
                                        Browse all products →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutCustomer>
    );
}
