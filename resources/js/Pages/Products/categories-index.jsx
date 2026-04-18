import AuthenticatedLayoutCustomer from '@/Layouts/AuthenticatedLayoutCustomer';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState, useEffect, useCallback } from 'react';
import TextInput from '@/Components/TextInput';

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function CategoriesIndex({ categories: propCategories, flash, search: initialSearch }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch(initialSearch || '');
    }, [initialSearch]);

    const getCurrentPage = () => {
        const url = new URL(window.location.href);
        return parseInt(url.searchParams.get('page')) || 1;
    };

    const debouncedSearch = useCallback(debounce((value) => {
        const currentPage = getCurrentPage();
        router.get(route('categories.index'), { search: value || null, page: currentPage }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, 300), []);

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    const deleteCategory = (id) => {
        if (confirm('Are you sure you want to delete this category and all associated products?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayoutCustomer
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded mb-6">
                                    {flash.success}
                                </div>
                            )}

                            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex justify-end">
                                    <Link href={route('categories.create')}>
                                        <PrimaryButton>Create Category</PrimaryButton>
                                    </Link>
                                </div>
                                <div className="w-full lg:w-64">
                                    <div className="relative">
                                        <TextInput
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search categories by name..."
                                            className="w-full pr-10"
                                        />
                                        {search && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const currentPage = getCurrentPage();
                                                    setSearch('');
                                                    router.get(route('categories.index'), { search: null, page: currentPage }, {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    });
                                                }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {propCategories?.data?.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto mb-6">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Description
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Products
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {propCategories.data.map((category) => (
                                                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {category.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {category.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                            {category.description || 'No description'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {category.products_count || 0}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <Link href={route('categories.edit', category.id)}>
                                                                <PrimaryButton className="px-3 py-1 text-xs">Edit</PrimaryButton>
                                                            </Link>
                                                            <DangerButton
                                                                onClick={() => deleteCategory(category.id)}
                                                                className="ms-2 px-3 py-1 text-xs"
                                                            >
                                                                Delete
                                                            </DangerButton>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {propCategories.last_page > 1 && (
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {Array.from({ length: propCategories.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={route('categories.index', { page, ...(search && { search }) })}
                                                    className={`px-3 py-2 rounded font-medium transition-colors ${
                                                        propCategories.current_page == page
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
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No categories found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutCustomer>
    );
}

