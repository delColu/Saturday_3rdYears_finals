import ApplicationLogo from '@/Components/ApplicationLogo';
import CartNav from '@/Components/CartNav';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayoutCustomer({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
<nav className="sticky top-0 z-50 bg-gradient-to-r from-black-500 via-black-500 to-white-500 shadow-xl backdrop-blur-md border-b border-emerald-200/50 dark:border-orange-200/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block rounded-full h-10 w-auto hover:scale-110 transition-transform duration-300" />
                                </Link>
                            </div>

<div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href="/dashboard" active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                        {user?.account?.account_type === 'customer' && (
                            <>
                                <NavLink href="/shop" active={route().current('shop')} className="flex items-center">
                                    Shop
                                    <svg className="w-4 h-4 inline ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </NavLink>
                                <CartNav className="!flex items-center" />
                            </>
                        )}

{(user?.account?.account_type && !/customer/i.test(user.account.account_type)) && (
                            <>
                                <NavLink href="/users">
                                    Users
                                </NavLink>
                                <NavLink href="/products">
                                    Products
                                </NavLink>
                                <NavLink href="/reports">
                                    Reports
                                </NavLink>
                                <NavLink href="/categories">
                                    Categories
                                </NavLink>
                            </>
                        )}

                                <NavLink href="/orders">
                                    Orders
                                </NavLink>
                                <NavLink href="/payments">
                                    Payments
                                </NavLink>
                                {/* reviews */}
                                <NavLink href="/reviews">
                                        Reviews
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center font-semibold text-sm text-white shadow-lg">
                                                        {user.first_name?.[0]}{user.last_name?.[0]}
                                                    </div>
                                                    <span className="font-medium text-sm hidden sm:block">{user.first_name} {user.last_name}</span>
                                                </div>

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink href="/dashboard" active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href="/shop">Shop</ResponsiveNavLink>
                            <ResponsiveNavLink href="/carts">
                                Cart
                                <svg className="w-4 h-4 inline ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1 3h10l-1-3M7 13l-1 3" />
                                </svg>
                            </ResponsiveNavLink>
{(user?.account?.account_type && !/customer/i.test(user.account.account_type)) && (
                            <>
                            <ResponsiveNavLink href="/users">Users</ResponsiveNavLink>
                            <ResponsiveNavLink href="/products">Products</ResponsiveNavLink>
                            </>
                            )}
                            <ResponsiveNavLink href="/orders">Orders</ResponsiveNavLink>
                            <ResponsiveNavLink href="/payments">Payments</ResponsiveNavLink>
                            <ResponsiveNavLink href="/reviews">Reviews</ResponsiveNavLink>
                        </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

{header && (
                <header className="bg-white/80 backdrop-blur-md shadow-xl border-b dark:bg-gray-800/80 dark:border-gray-700/50">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
