<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthToken
{
    public function handle(Request $request, Closure $next)
    {
        // Obtener el token del encabezado
        $token = $request->header('Authorization');

        // Lista de tokens válidos (esto vendría de la BD a posteriori)
        $validTokens = ['123456789', 'abcdefg', 'pruebadeapi']; 

        if (!in_array($token, $validTokens)) {
            return response()->json(['error' => 'Token inválido'], 401);
        }

        return $next($request);
    }
}
