<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthenticateWithSanctum
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if ($token !== session('auth_token')) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        return $next($request);
    }
}