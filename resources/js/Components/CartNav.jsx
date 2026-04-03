import { Link, router, usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { useState, useEffect } from 'react';

export default function CartNav() {
    const { auth } = usePage().props;
    const [cartCount, setCartCount] = useState(0);

    // Simple cart count (could fetch via prop or API)
    useEffect(() => {
        if (auth.user) {
            // For demo, assume count from props or local state
            // In production, pass from middleware/controller
            setCartCount(3); // Placeholder - replace with real count
        }
    }, [auth]);

    if (auth.user?.account?.account_type !== 'customer') {
        return null;
    }

    return (
        <div className="relative">
            <NavLink href={route('carts.index')} className="relative flex items-center space-x-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5A2 2 0 007.4 20h9.2a2 2 0 001.9-1.5L19 13m-6-8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                Cart
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </NavLink>
        </div>
    );
}

