import AuthenticatedLayoutCustomer from '@/Layouts/AuthenticatedLayoutCustomer';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import GreenBtn from '@/Components/GreenBtn';

export default function PaymentsIndex() {
    const { payments, auth } = usePage().props;
    const isAdmin = auth?.user?.account?.account_type?.toLowerCase().includes('admin');

    return (
        <AuthenticatedLayoutCustomer
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Payments
                </h2>
            }
        >
            <Head title="Payments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
{payments?.data?.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto mb-6">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Order ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Method
                                                    </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {payments.data.map((payment) => (
                                                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {payment.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {payment.order_id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                        ${payment.amount}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                        {payment.payment_method || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            payment.status === 'success'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                                        }`}>
                                                            {payment.status || 'pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-left text-sm">
                                                    <PrimaryButton>
                                                        <Link href={route('payments.show', payment.id)}>
                                                        View
                                                        </Link>
                                                    </PrimaryButton>

                                                    {isAdmin && (
                                                        <GreenBtn className="ml-2">
                                                        <Link href={route('payments.edit', payment.id)}>
                                                            Edit
                                                        </Link>
                                                        </GreenBtn>
                                                    )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                    {payments.last_page > 1 && (
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {Array.from({ length: payments.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={`/payments?page=${page}`}
                                                    className={`px-3 py-2 rounded font-medium transition-colors ${
                                                        payments.current_page == page
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
                                <p className="text-gray-500 dark:text-gray-400">No payments found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutCustomer>
    );
}
