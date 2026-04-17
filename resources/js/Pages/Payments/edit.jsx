import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';

export default function PaymentEdit({ payment }) {
    const { flash, auth } = usePage().props;
    const isAdmin = auth?.user?.account?.account_type?.toLowerCase().includes('admin');

    useEffect(() => {
        if (!isAdmin) {
            router.visit(route('payments.index'));
        }
    }, [isAdmin]);

    const [status, setStatus] = useState(payment.status || 'pending');

    const submit = (e) => {
        e.preventDefault();
        router.put(route('payments.update', payment.id), {
            status: status
        });
    };

    const items = payment.order?.order_items || [];
    const total = parseFloat(payment.amount || 0);

    const customerName = payment.account?.user ?
        `${payment.account.user.first_name} ${payment.account.user.last_name}` :
        'N/A';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Payment #{payment.id}
                </h2>
            }
        >
            <Head title={`Edit Payment ${payment.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded dark:bg-green-900 dark:border-green-300 dark:text-green-100">
                                    {flash.success}
                                </div>
                            )}

                            {/* Payment Details */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel value="Payment ID" className="block text-sm font-medium mb-1" />
                                        <p className="text-lg font-bold">{payment.id}</p>
                                    </div>
                                    <div>
                                        <InputLabel value="Status" className="block text-sm font-medium mb-1" />
                                        <form onSubmit={submit} className="flex items-center space-x-2">
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="success">Success</option>
                                                <option value="failed">Failed</option>
                                                <option value="refunded">Refunded</option>
                                            </select>
                                            <PrimaryButton type="submit">Update Status</PrimaryButton>
                                        </form>
                                    </div>
                                    <div>
                                        <InputLabel value="Customer" className="block text-sm font-medium mb-1" />
                                        <p>{customerName}</p>
                                    </div>
                                    <div>
                                        <InputLabel value="Amount" className="block text-sm font-medium mb-1" />
                                        <p className="text-lg font-bold">${total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <InputLabel value="Method" className="block text-sm font-medium mb-1" />
                                        <p>{payment.payment_method || 'N/A'}</p>
                                    </div>
                                    {payment.order && (
                                        <div>
                                            <InputLabel value="Order" className="block text-sm font-medium mb-1" />
                                            <Link
                                                href={route('orders.show', payment.order.id)}
                                                className="text-blue-600 hover:text-blue-500 font-medium"
                                            >
                                                #{payment.order.id}
                                            </Link>
                                        </div>
                                    )}
                                    <div>
                                        <InputLabel value="Created" className="block text-sm font-medium mb-1" />
                                        <p>{new Date(payment.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <InputLabel value="Updated" className="block text-sm font-medium mb-1" />
                                        <p>{new Date(payment.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            {items.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                                    <div className="overflow-x-auto">
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
                                                {items.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {item.product?.name || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                                                            ${parseFloat(item.product?.price || 0).toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-right">
                                                            ${(parseFloat(item.quantity || 0) * parseFloat(item.product?.price || 0)).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end space-x-3">
                                <Link
                                    href={route('payments.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest hover:bg-gray-400 dark:hover:bg-gray-600 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Back to Payments
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
