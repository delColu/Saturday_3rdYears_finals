import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function ConfirmPayment({ order, cartItems = [] }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        payment_method: 'card',
        order_id: order?.id || '',
    });

    const items = cartItems.length > 0 ? cartItems : (order?.order_items || []);
    const total = Number(order?.total_amount) || items.reduce((sum, item) => sum + (Number(item.quantity) * (Number(item.product?.price) || Number(item.price) || 0)), 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('payments.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Confirm Payment
                </h2>
            }
        >
            <Head title="Confirm Payment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {flash?.message && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded dark:bg-green-900 dark:border-green-300 dark:text-green-100">
                                    {flash.message}
                                </div>
                            )}

                            {Object.values(errors).length > 0 && (
                                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-300 dark:text-red-100">
                                    <ul className="list-disc list-inside">
                                        {Object.values(errors).map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Order #{order?.id}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {order?.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>

                            {items.length > 0 ? (
                                <div className="overflow-x-auto mb-6">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Qty
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Subtotal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {items.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {item.product?.name || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                                                        ${Number(item.product?.price || item.price || 0).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-right">
                                                        {(Number(item.quantity) * (Number(item.product?.price) || Number(item.price) || 0)).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 mb-6">No items in this order.</p>
                            )}

                            <div className="mb-6">
                                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    Total: ${total.toFixed(2)}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Payment Method
                                    </label>
                                    <select
                                        value={data.payment_method}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        disabled={processing}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        <option value="card">Credit/Debit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bank">Bank Transfer</option>
                                        <option value="cash">Cash on delivery</option>
                                    </select>
                                    {errors.payment_method && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.payment_method}</p>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Link
                                        href={route('orders.index')}
                                        className="flex-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 w-full sm:w-auto"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton
                                        type="submit"
                                        className="flex-1"
                                        disabled={processing}
                                    >
                                        {processing ? 'Processing...' : 'Confirm Payment'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

