<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Method to handle user authentication and token generation
    public function generateToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $user = User::where('email', $request->email)->first();

        $token = $user->createToken('Token for user ' . $user->email)->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    // Method to handle user logout and token revocation
    public function logout(Request $request)
    {

        dd($request->user());
        // // Revoke the current token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'You have been successfully logged out.'
        ], 200);
    }
}
