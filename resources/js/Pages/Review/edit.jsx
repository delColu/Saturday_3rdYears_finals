import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function ReviewEdit({ review, products }) {
    const { data, setData, patch, processing, errors } = useForm({
        product_id: review.product.id,
        rating: review.rating,
        comment: review.comment,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('reviews.update', review.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Review
                    </h2>
                    <Link href={route('reviews.index')} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                        Back to Reviews
                    </Link>
                </div>
            }
        >
            <Head title="Edit Review" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div className="mb-6">
                                    <InputLabel htmlFor="product_id" value="Product" />
                                    <select
                                        id="product_id"
                                        name="product_id"
                                        value={data.product_id}
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    >
                                        <option value="">Select Product</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.product_id} className="mt-2" />
                                </div>

                                <div className="mb-6">
                                    <InputLabel htmlFor="rating" value="Rating" />
                                    <select
                                        id="rating"
                                        name="rating"
                                        value={data.rating}
                                        onChange={(e) => setData('rating', parseInt(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    >
                                        {[1,2,3,4,5].map((r) => (
                                            <option key={r} value={r}>{r} Stars</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.rating} className="mt-2" />
                                </div>

                                <div className="mb-6">
                                    <InputLabel htmlFor="comment" value="Comment" />
                                    <TextInput
                                        id="comment"
                                        name="comment"
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        className="mt-1 block w-full"
                                        rows="4"
                                    />
                                    <InputError message={errors.comment} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Review'}
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

