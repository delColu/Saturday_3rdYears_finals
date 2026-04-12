import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Credits({ auth }) {
    return (
        <GuestLayout>
            <Head title="Credits" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-2xl">
                        <div className="p-8 md:p-12 text-gray-900 dark:text-gray-100">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
                                    Credits
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                    Built with ❤️ for learning Laravel & Inertia.js
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Developer</h2>
                                    <p className="text-lg mb-4">
                                        This project was developed by: <strong>You (the amazing developer!)</strong>
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Full-stack e-commerce app with authentication, carts, orders, payments, and reviews.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Assets & Thanks</h2>
                                    <ul className="space-y-3 text-lg">
                                        <li>
                                            Retail icons created by{' '}
                                            <a
                                                href="https://www.flaticon.com/free-icons/retail"
                                                className="text-blue-600 hover:text-blue-800 font-semibold underline"
                                                target="_blank" rel="noopener noreferrer"
                                            >
                                                Frey Wazza - Flaticon
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://tailwindui.com"
                                                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
                                                target="_blank" rel="noopener noreferrer"
                                            >
                                                Tailwind UI
                                            </a>{' '}
                                            for inspiration
                                        </li>
                                        <li>Laravel Breeze & Inertia.js starter</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700 text-center">
                                <Link
                                    href="/"
                                    className="inline-flex px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                >
                                    ← Back to Shop
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
