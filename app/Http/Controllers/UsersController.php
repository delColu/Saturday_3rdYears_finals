<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        return Inertia::render('Users/index', [
            'users' => User::with('account')
                ->when($search, function ($query, $search) {
                    return $query->where('first_name', 'LIKE', "%{$search}%")
                        ->orWhere('last_name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%");
                })
                ->paginate(10),
            'search' => $search,
        ]);
    }

    public function create()
    {
        // Admin only
        $authUserAccountType = auth()->user()->account?->account_type ?? '';
        $availableTypes = ['customer'];
        if (stripos($authUserAccountType, 'admin') !== false) {
            $availableTypes[] = 'admin';
        }
        if (stripos($authUserAccountType, 'super') !== false || stripos($authUserAccountType, 'super_admin') !== false) {
            $availableTypes[] = 'super admin';
        }
        return Inertia::render('Users/create', [
            'available_account_types' => $availableTypes
        ]);
    }

    public function store(Request $request)
    {
        // Admin only
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'account_type' => 'required|string|in:customer,admin,super admin',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        $user->account()->create([
            'account_type' => $validated['account_type'],
            'status' => 'active',
        ]);

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        // Admin only
        return Inertia::render('Users/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        // Admin only
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($validated['password']) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        // Admin only - add soft delete if needed
        $user->delete();

        return redirect()->route('users.index');
    }
}
