import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductCard({ product }) {

    const imageSrc = product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/300x200?text=No+Image';

    const [quantity, setQuantity] = useState(1);

    return (

        <Link href={route('products.show', product.id)} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 bg-gray-100 dark:bg-gray-700 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.status === 'available'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                            {product.status}
                        </span>
                        {product.category && (
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                {product.category.name}
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {product.description || 'No description available.'}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            ${product.price}
                        </span>
                        <div className="flex items-center space-x-2">
                            <TextInput
                                type="number"
                                className="w-16 px-2 py-1 text-sm"
                                min="1"
                                max={product.stock || 99}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock || 99, parseInt(e.target.value) || 1)))}
                            />
                            <PrimaryButton
                                as="button"
                                className="px-4 py-2 text-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    router.post(route('carts.store'), {
                                        product_id: product.id,
                                        quantity
                                    });
                                }}
                                disabled={product.status !== 'available'}
                            >
                                Add
                            </PrimaryButton>

                        </div>

                    </div>
                </div>
            </div>
        </Link>
    );
}

