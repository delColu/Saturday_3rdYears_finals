<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user || !$user->account) {
            abort(403, 'Access denied. Account not found.');
        }

        // Case-insensitive check for admin/super admin
        $accountType = strtolower($user->account->account_type);
        if (!str_contains($accountType, 'admin')) {
            abort(403, 'Admin access required.');
        }

        return $next($request);
    }
}

