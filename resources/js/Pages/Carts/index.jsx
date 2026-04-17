import AuthenticatedLayoutCustomer from '@/Layouts/AuthenticatedLayoutCustomer';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useState } from 'react';

export default function CartsIndex() {
    const { cartItems, total, flash } = usePage().props;
    const [updatingId, setUpdatingId] = useState(null);

    const updateQuantity = (id, quantity) => {
        setUpdatingId(id);
        router.patch(route('carts.update', id), { quantity }, {
            onSuccess: () => setUpdatingId(null),
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeItem = (id) => {
        if (confirm('Remove this item from cart?')) {
            router.delete(route('carts.destroy', id));
        }
    };

    const checkout = () => {
        router.post(route('carts.checkout'));
    };

    return (
        <AuthenticatedLayoutCustomer
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Shopping Cart
                </h2>
            }
        >
            <Head title="Cart" />

            {flash?.message && (
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-4">
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded dark:bg-green-900 dark:border-green-800">
                        {flash.message}
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {cartItems?.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto mb-8">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Product
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Price
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Quantity
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Subtotal
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {cartItems.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <img
                                                                    src={item.product.image ? `/storage/${item.product.image}` : 'https://via.placeholder.com/80x80'}
                                                                    alt={item.product.name}
                                                                    className="w-16 h-16 object-cover rounded-lg mr-4"
                                                                />
                                                                <div>
                                                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                                                        {item.product.name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                        {item.product.category?.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            ${item.product.price}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {updatingId === item.id ? (
                                                                <div className="flex items-center space-x-2">
                                                                    <TextInput
                                                                        type="number"
                                                                        className="w-20"
                                                                        defaultValue={item.quantity}
                                                                        onBlur={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm font-medium">{item.quantity}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            ${(item.quantity * item.product.price).toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <DangerButton
                                                                onClick={() => removeItem(item.id)}
                                                                className="px-3 py-1 text-xs"
                                                            >
                                                                Remove
                                                            </DangerButton>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Totals */}
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                Total: ${total.toFixed(2)}
                                            </span>
                                            <div className="space-x-3">
                                                <Link href={route('shop.index')}>
                                                    <PrimaryButton>Continue Shopping</PrimaryButton>
                                                </Link>
                                                <PrimaryButton onClick={checkout} disabled={cartItems.length === 0}>
                                                    Proceed to Checkout
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Looks like you haven't added anything to your cart yet.
                                    </p>
                                    <Link href={route('shop.index')}>
                                        <PrimaryButton>Start Shopping</PrimaryButton>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutCustomer>
    );
}

