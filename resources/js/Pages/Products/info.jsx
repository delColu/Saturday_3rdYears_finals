import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function ProductInfo({ product, relatedProducts }) {
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        router.post(route('carts.store'), {
            product_id: product.id,
            quantity
        });
    };

    const imageSrc = product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/500x500?text=No+Image';

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
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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

                                    <div className="prose dark:prose-invert max-w-none">
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
                                    </div>
                                </div>
                            </div>

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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
