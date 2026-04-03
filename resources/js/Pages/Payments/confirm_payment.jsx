import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';

export default function ConfirmPayment({ order, cartItems }) {
    const { data, post, processing } = useForm({
        payment_method: 'card',
        order_id: order.id,
    });

    useEffect(() => {
        post(route('payments.store'), {
            onSuccess: () => {
                router.visit(route('payments.index'));
            }
        });
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

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
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Order Summary */}
                                <div>
                                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                                        Order Summary
                                    </h3>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-lg">
                                            <span>Order #:</span>
                                            <span className="font-semibold">{order.id}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                                    <span>{item.product.name}</span>
                                                    <span className="font-semibold">
                                                        {item.quantity} × ${item.product.price} = ${(item.quantity * item.product.price).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <span>Total:</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Form */}
                                <div>
                                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                                        Payment Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 dark:bg-green-900 dark:border-green-500 dark:text-green-200">
                                            <strong>DEMO MODE:</strong> Payment automatically confirmed! Processing...
                                        </div>
                                        <PrimaryButton
                                            disabled={true}
                                            className="w-full py-3 text-lg bg-gray-400 cursor-not-allowed"
                                        >
                                            {processing ? 'Demo Processing...' : 'Demo Payment Confirmed'}
                                        </PrimaryButton>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <Link
                                            href={route('payments.index')}
                                            className="text-green-600 hover:text-green-500 dark:text-green-400 font-medium"
                                        >
                                            → View Payments
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
