import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import Items from './items.jsx';

export default function OrdersIndex() {
    const { orders } = usePage().props;
    const [showItemsModal, setShowItemsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
{orders?.data?.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto mb-6">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        User
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Total
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Created At
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {orders.data.map((order) => (
                                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {order.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {order.user?.first_name || 'N/A'} {order.user?.last_name || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            ${order.total_amount || 0}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {order.status || 'Pending'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                            <Link
                                                                href={route('orders.edit', order.id)}
                                                                className="px-3 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition-colors"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedOrder(order);
                                                                    setShowItemsModal(true);
                                                                }}
                                                                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                                                            >
                                                                View Items
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {showItemsModal && selectedOrder && (
                                        <Modal show={showItemsModal} onClose={() => setShowItemsModal(false)}>
                                            <div className="p-6">
                                                <h2 className="text-lg font-semibold mb-4">Order #{selectedOrder.id} Items</h2>
                                                <Items order={selectedOrder} />
                                            </div>
                                        </Modal>
                                    )}
                                    {orders.last_page > 1 && (
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {Array.from({ length: orders.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={`/orders?page=${page}`}
                                                    className={`px-3 py-2 rounded font-medium transition-colors ${
                                                        orders.current_page == page
                                                            ? 'bg-blue-500 text-white'
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
                                <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
