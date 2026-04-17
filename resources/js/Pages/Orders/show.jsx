import AuthenticatedLayoutCustomer from '@/Layouts/AuthenticatedLayoutCustomer.jsx';
import { Head, Link, usePage } from '@inertiajs/react';
import Items from './items.jsx';

export default function OrderShow({ order, auth }) {
    const { flash } = usePage().props;
    const isAdmin = auth?.user?.account?.account_type?.toLowerCase().includes('admin');

    return (
        <AuthenticatedLayoutCustomer
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Order #{order.id}
                </h2>
            }
        >
            <Head title={`Order ${order.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded dark:bg-green-900 dark:border-green-300 dark:text-green-100">
                                    {flash.success}
                                </div>
                            )}

                            {/* Order Details - Read Only */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order ID</label>
                                        <p className="text-lg font-bold">{order.id}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                                            order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                                            order.status === 'Shipped' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                            order.status === 'Delivered' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                                        }`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer</label>
                                        <p>{order.user?.first_name} {order.user?.last_name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Amount</label>
                                        <p className="text-lg font-bold">${parseFloat(order.total_amount || 0).toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created</label>
                                        <p>{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Updated</label>
                                        <p>{new Date(order.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                                <Items order={order} />
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end space-x-3">
                                {isAdmin && (
                                    <Link
                                        href={route('orders.edit', order.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit Order
                                    </Link>
                                )}
                                <Link
                                    href={route('orders.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest hover:bg-gray-400 dark:hover:bg-gray-600 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Back to Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutCustomer>
    );
}

