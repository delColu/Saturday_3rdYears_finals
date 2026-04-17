import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductCard({ product }) {

    const imageSrc = product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/300x200?text=No+Image';

    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const isAvailable = product.status === 'available' && product.stock > 0;

    return (
        <Link href={route('products.show', product.id)} className="block">
            <div className="flex flex-col h-full min-h-[28rem] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-56 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-900 group-hover:scale-105 transition-all duration-500 overflow-hidden border-b-4 border-emerald-200 dark:border-emerald-900/50">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 flex flex-col p-6 min-h-[14rem]">
                    <div className="flex flex-wrap items-center gap-2 h-16 overflow-hidden mb-4">
                        {Math.random() > 0.7 && (
                            <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse whitespace-nowrap">
                                🔥 Hot Deal
                            </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md whitespace-nowrap ${
                            product.status === 'available'
                                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-800/50'
                                : 'bg-red-100 text-red-800 border-2 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800/50'
                        }`}>
                            {isAvailable ? `In Stock (${product.stock})` : 'Unavailable'}
                        </span>
                        {product.category && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-lg whitespace-nowrap max-w-[80px] truncate">
                                {product.category.name}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="flex text-orange-400 text-sm">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'stroke-current'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="ms-1 text-xs text-gray-500">(127)</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-emerald-700 transition-all duration-300 line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
                        {product.description || 'No description available.'}
                    </p>
                    <div className="mt-auto space-y-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 block">
                            ${product.price}
                        </span>
                        <div className="flex items-center justify-between gap-3">
                            <TextInput
                                type="number"
                                className="w-20 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                                min="1"
                                max={isAvailable ? product.stock : 0}
                                value={quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 1;
                                    setQuantity(isAvailable ? Math.max(1, Math.min(product.stock, val)) : 1);
                                }}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    router.post(route('carts.store'), {
                                        product_id: product.id,
                                        quantity
                                    });
                                    setAdded(true);
                                    setTimeout(() => setAdded(false), 2000);
                                }}
                                disabled={!isAvailable}
                                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm"
                            >
                                {added ? (
                                    <>
                                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Added</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1 3h10l-1-3M7 13l-1 3" />
                                        </svg>
                                        <span>Add</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
