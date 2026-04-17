import AuthenticatedLayoutCustomer from '@/Layouts/AuthenticatedLayoutCustomer';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import { useState, useEffect, useCallback } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

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

export default function UsersIndex({ search: initialSearch }) {
    const { auth, users, search: propSearch } = usePage().props;
    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch(initialSearch || propSearch || '');
    }, []);

const getCurrentPage = () => {
        const url = new URL(window.location.href);
        return parseInt(url.searchParams.get('page')) || 1;
    };

    const debouncedSearch = useCallback(debounce((value) => {
        const currentPage = getCurrentPage();
        router.get(route('users.index'), { search: value || null, page: currentPage }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, 300), []);

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);
const isAdminPlus = auth.user?.account?.account_type && /admin/i.test(auth.user.account.account_type);

    const deleteUser = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', userId));
        }
    };

    return (
        <AuthenticatedLayoutCustomer
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                {isAdminPlus && (
                                    <div className="flex justify-end">
                                        <Link
                                            href={route('users.create')}
                                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Create User
                                        </Link>
                                    </div>
                                )}
                                <div className="w-full lg:w-64">
                                    <InputLabel value="Search users..." className="sr-only" />
                                    <div className="relative">
                                        <TextInput
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search users by name or email..."
                                            className="w-full pr-10"
                                        />
                                        {search && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const currentPage = getCurrentPage();
                                                    setSearch('');
                                                    router.get(route('users.index'), { search: null, page: currentPage });
                                                }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {users?.data?.length > 0 ? (
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
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Account Type
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Created At
                                                    </th>
                                                    {isAdminPlus && (
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            Actions
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {users.data.map((user) => (
                                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {user.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {user.first_name} {user.last_name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {user.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {user.account?.account_type || 'No Account'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {new Date(user.created_at).toLocaleDateString()}
                                                        </td>
                                                        {isAdminPlus && (
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <Link
                                                                    href={route('users.edit', user.id)}
                                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                                >
                                                                    <PrimaryButton className="px-3 py-1 text-xs">Edit</PrimaryButton>
                                                                </Link>
                                                                <DangerButton onClick={() => deleteUser(user.id)}>
                                                                    Delete
                                                                </DangerButton>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {users.last_page > 1 && (
                                        <div className="flex flex-wrap justify-center gap-2">
{Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={route('users.index', { page, ...(search && { search }) })}
                                                    className={`px-3 py-2 rounded font-medium transition-colors ${
                                                        users.current_page == page
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
                                <p className="text-gray-500 dark:text-gray-400">No users found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutCustomer>
    );
}
