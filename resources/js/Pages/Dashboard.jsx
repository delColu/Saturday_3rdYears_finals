import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ recentOrders, recentUsers, recentProducts, recentPayments }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-2">
                        {/* Recent Orders Card */}
                        <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h3>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{recentOrders.length}</div>
                                </div>
                            </div>
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {recentOrders.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">#{order.id}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.user?.first_name || 'N/A'} {order.user?.last_name || 'N/A'}</p>
                                                </div>
                                                <Link
                                                    href={`/orders`}
                                                    className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                                                >
                                                    View All →
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent orders.</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Users Card */}
                        <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Users</h3>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{recentUsers.length}</div>
                                </div>
                            </div>
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {recentUsers.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentUsers.map((user) => (
                                            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                                </div>
                                                <Link href="/users" className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
                                                    View All →
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent users.</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Products Card */}
                        <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Products</h3>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{recentProducts.length}</div>
                                </div>
                            </div>
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {recentProducts.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentProducts.map((product) => (
                                            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">${product.price}</p>
                                                </div>
                                                <Link href="/products" className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
                                                    View All →
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent products.</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Payments Card */}
                        <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Payments</h3>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{recentPayments.length}</div>
                                </div>
                            </div>
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {recentPayments.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentPayments.map((payment) => (
                                            <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">#{payment.id}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">${payment.amount}</p>
                                                </div>
                                                <Link href="/payments" className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
                                                    View All →
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent payments.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
