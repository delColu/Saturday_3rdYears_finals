import { Head, Link, usePage, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ProductCard from '@/Components/ProductCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';

export default function Welcome({ auth, products, categories, canLogin, canRegister, laravelVersion, phpVersion }) {
    const { user } = auth || {};

    return (
        <>
            <Head title="FruitMarket - Fresh Fruits Online" />
            <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/fruit-market.svg"
                            alt="Fresh Fruits Banner"
                            className="w-full h-full object-cover opacity-20 dark:opacity-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                    </div>
                    <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
                        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-20">
                            <div className="flex lg:col-start-1">
                            <Link href="/" className="flex items-center">
                                    <ApplicationLogo className="h-16 w-16 rounded-full shadow-lg mr-4" />
                                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-lime-500 bg-clip-text text-transparent">
                                        FruitMarket
                                    </span>
                                </Link>
                            </div>
                            <nav className="-mx-4 lg:mx-0 flex flex-wrap justify-center lg:justify-end gap-2 lg:gap-4">
                                {user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-6 py-3 rounded-full bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-medium hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link
                                                href={route('login')}
                                                className="px-6 py-3 rounded-full border-2 border-lime-500 text-lime-600 font-medium hover:bg-lime-500 hover:text-white transition-all duration-300"
                                            >
                                                Log in
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link
                                                href={route('register')}
                                                className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                            >
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )}
                            </nav>
                        </header>

                        <div className="text-center max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-lime-600 via-emerald-600 to-green-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
                                Fresh Fruits Daily!
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Discover the freshest organic fruits at unbeatable prices. Farm-to-door delivery.
                                Start shopping now!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/shop"
                                    className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Shop Fruits →
                                </Link>
                                {!user && canLogin && (
                                    <Link
                                        href={route('login')}
                                        className="px-10 py-5 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-full hover:bg-emerald-600 hover:text-white transform hover:scale-105 transition-all duration-300 dark:border-lime-500 dark:text-lime-400 dark:hover:bg-lime-500"
                                    >
                                        Login to Cart
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-24 lg:py-32 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-lime-500 bg-clip-text text-transparent mb-6">
                                Featured Fruits
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Browse our freshest fruits. Add to cart and enjoy farm-fresh delivery.
                            </p>
                        </div>

                        {products && products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {products.slice(0, 8).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-3xl">🍎</span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    No Fruits Yet
                                </h3>
                                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                    Our fruit market is getting ready. Check back soon for amazing fruits!
                                </p>
                                <Link
                                    href="/shop"
                                    className="inline-flex px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-all"
                                >
                                    Explore Fruits →
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gradient-to-r from-emerald-900 to-lime-900 text-white py-12">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-lg mb-4">&amp;copy; 2024 FruitMarket. Fresh Fruits Online - Built with Laravel v{laravelVersion} (PHP v{phpVersion})</p>
                        <Link href="/credits" className="text-lime-300 hover:text-lime-200">
                            Credits
                        </Link>
                    </div>
                </footer>
            </div>
        </>
    );
}
