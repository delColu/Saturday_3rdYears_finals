import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function ReviewsIndex({ reviews, isAdmin }) {
    const { auth } = usePage().props;

    const destroyReview = (id) => {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(route('reviews.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {isAdmin ? 'All Reviews' : 'My Reviews'}
                </h2>
            }
        >
            <Head title="Reviews" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <Link href={route('reviews.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    New Review
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comment</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                                        {reviews.data.map((review) => (
                                            <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link href={route('products.show', review.product.id)} className="text-blue-600 hover:text-blue-900 font-medium">
                                                        {review.product.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 dark:text-gray-100">
                                                        {review.comment}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link href={route('reviews.edit', review.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                        <PrimaryButton>Edit</PrimaryButton>
                                                    </Link>
                                                    <button onClick={() => destroyReview(review.id)} className="text-red-600 hover:text-red-900">
                                                        <DangerButton>Delete</DangerButton>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
{reviews.last_page > 1 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-6">
                                    {Array.from({ length: reviews.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/reviews?page=${page}`}
                                            className={`px-3 py-2 rounded font-medium transition-colors ${
                                                reviews.current_page == page
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

