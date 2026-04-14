import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Items from './items.jsx';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function OrderEdit({ order }) {
    const { flash } = usePage().props;
    const [status, setStatus] = useState(order.status || 'Pending');

    const submit = (e) => {
        e.preventDefault();
        router.put(route('orders.update', order.id), {
            status: status
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Order #{order.id}
                </h2>
            }
        >
            <Head title={`Edit Order ${order.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {flash.success}
                                </div>
                            )}

                            {/* Order Details */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order ID</label>
                                        <p className="text-lg font-bold">{order.id}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <form onSubmit={submit} className="flex items-center space-x-2">
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <PrimaryButton type="submit">Update Status</PrimaryButton>
                                        </form>
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
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                                <Items order={order} />
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
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
        </AuthenticatedLayout>
    );
}
