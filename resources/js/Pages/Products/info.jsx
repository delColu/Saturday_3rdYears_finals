import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import QRCodeSection from '@/Components/QRCodeSection';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';

export default function ProductInfo({ product, relatedProducts }) {
    const [quantity, setQuantity] = useState(1);

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [reviewErrors, setReviewErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [tempRating, setTempRating] = useState(5);

    const addToCart = () => {
        router.post(route('carts.store'), {
            product_id: product.id,
            quantity
        });
    };

    const imageSrc = product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/500x500?text=No+Image';

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setReviewErrors({});

        try {
            await router.post(route('reviews.store'), {
                product_id: product.id,
                ...reviewForm
            });
            setShowReviewModal(false);
            setReviewForm({ rating: 5, comment: '' });
            router.reload({ only: ['product'] });
        } catch (error) {
            if (error.response?.data?.errors) {
                setReviewErrors(error.response.data.errors);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const setRating = (rating) => {
        setReviewForm(prev => ({ ...prev, rating }));
    };

    const productUrl = route('products.show', product.id);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Product Details
                </h2>
            }
        >
            <Head title={product.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Product Image */}
                                <div className="flex justify-center">
                                    <img
                                        src={imageSrc}
                                        alt={product.name}
                                        className="w-full max-w-md h-96 object-cover rounded-lg shadow-lg"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="space-y-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                            {product.name}
                                        </h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {product.category?.name}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                            ${product.price}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className={`px-3 py-1 rounded-full text-sm text-white font-medium ${
                                            product.status === 'available'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900'
                                        }`}>
                                            {product.status === 'available' ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                        <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                                            Stock: {product.stock}
                                        </span>
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-700 text-white p-4 rounded-lg shadow-sm">
                                        <div dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }} />
                                    </div>

                                    {/* Quantity & Add to Cart */}
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Quantity
                                            </label>
                                            <TextInput
                                                type="number"
                                                min="1"
                                                max={product.stock}
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value))))}
                                                className="w-24"
                                            />
                                        </div>
                                        <PrimaryButton
                                            onClick={addToCart}
                                            disabled={product.status !== 'available' || product.stock === 0}
                                            className="px-8 py-3 text-lg"
                                        >
                                            Add to Cart
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => setShowReviewModal(true)}
                                            className="px-8 py-3 text-lg"
                                        >
                                            Write a Review
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                            {/* Reviews Section */}
                            {product.reviews && product.reviews.length > 0 && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                                        Reviews ({product.reviews.length})
                                    </h2>
                                    <div className="space-y-4 mb-8">
                                        {product.reviews.map((review) => (
                                            <div key={review.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                                                <div className="flex items-center mb-2">
                                                    <div className="text-lg">
                                                        {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                                                    </div>
                                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                        by {review.user.first_name} {review.user.last_name} on {new Date(review.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-900 dark:text-gray-100">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related Products */}
                            {relatedProducts && relatedProducts.length > 0 && (
                                <div className="mt-16">
                                    <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                                        Related Products
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {relatedProducts.map((related) => (
                                            <div key={related.id} className="group">
                                                <Link href={route('products.show', related.id)}>
                                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-all">
                                                        <img
                                                            src={related.image ? `/storage/${related.image}` : 'https://via.placeholder.com/200x200'}
                                                            alt={related.name}
                                                            className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                                                        />
                                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                            {related.name}
                                                        </h3>
                                                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                                            ${related.price}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* QR Code Section */}
                            <QRCodeSection
                                productUrl={productUrl}
                                productName={product.name}
                            />
                        </div>
                    </div>
                </div>
            </div>
        <Modal show={showReviewModal} onClose={() => {
            setShowReviewModal(false);
            setReviewErrors({});
            setReviewForm({ rating: 5, comment: '' });
            setTempRating(5);
        }}>
            <form onSubmit={handleReviewSubmit} className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Write a Review</h2>

                {/* Star Rating */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">Your rating</label>
                    <div className="flex justify-center">
                        {[1,2,3,4,5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => {
                                    setRating(star);
                                    setTempRating(star);
                                }}
                                onMouseEnter={() => setTempRating(star)}
                                onMouseLeave={() => setTempRating(reviewForm.rating)}
                                className={`mx-1 text-3xl cursor-pointer transition-all transform hover:scale-125 ${
                                    tempRating >= star
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-500'
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <InputError className="mt-2">{reviewErrors.rating}</InputError>
                </div>

                {/* Comment */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Comment</label>
                    <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                        rows="5"
                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white p-3 resize-vertical"
                        placeholder="Share your thoughts about this product..."
                        disabled={submitting}
                    />
                    <InputError className="mt-2">{reviewErrors.comment}</InputError>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t dark:border-gray-600">
                    <SecondaryButton
                        onClick={() => {
                            setShowReviewModal(false);
                            setReviewErrors({});
                            setReviewForm({ rating: 5, comment: '' });
                            setTempRating(5);
                        }}
                        disabled={submitting}
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        className="w-full sm:w-auto"
                        disabled={submitting}
                        type="submit"
                    >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
        </AuthenticatedLayout>
    );
}
