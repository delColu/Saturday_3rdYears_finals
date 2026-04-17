import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function EmailPreview({ order }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Shipped Email Preview - Order #{order.id}
                </h2>
            }
        >
            <Head title={`Shipped Email Preview - Order ${order.id}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-2xl mx-auto">
                                {/* Email Header */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border-b pb-6 mb-8">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Your Order #{order.id} Has Been Shipped!
                                    </h1>
                                </div>

                                {/* Greeting */}
                                <div className="mb-8">
                                    <p className="text-lg text-gray-900 dark:text-gray-100">
                                        Hi {order.user?.first_name || 'Customer'},
                                    </p>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                                        Great news! Your order has been shipped.
                                    </p>
                                </div>

                                {/* Order Details */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Order Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Order ID:</span>
                                            <span className="ml-2 font-semibold">{order.id}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Total Amount:</span>
                                            <span className="ml-2 font-semibold">${parseFloat(order.total_amount || 0).toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Shipped At:</span>
                                            <span className="ml-2">{order.shipped_at ? new Date(order.shipped_at).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Items */}
                                {order.order_items && order.order_items.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Items Shipped</h3>
                                        <div className="space-y-3">
                                            {order.order_items.map((item) => (
                                                <div key={item.id} className="flex justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border">
                                                    <div>
                                                        <div className="font-medium">{item.product?.name || 'N/A'}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</div>
                                                    </div>
                                                    <div className="font-semibold">${parseFloat(item.price || 0).toFixed(2)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600 text-center">
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        Thank you for shopping with us!
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        Grocery Store
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Link
                                    href={route('orders.index')}
                                    className="inline-flex items-center px-6 py-2 bg-gray-300 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Back to Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

