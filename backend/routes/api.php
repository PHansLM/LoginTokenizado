<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::post('/login', function (Request $request) {
    // Simulación de usuario sin base de datos
    $email = $request->input('email');
    $password = $request->input('password');

    if ($email === 'test@example.com' && $password === 'password') {
        // Generar un token aleatorio
        $token = Str::random(60);
        
        // Guardarlo en la sesión (como simulación de base de datos)
        session(['auth_token' => $token]);

        return response()->json(['token' => $token]);
    }

    return response()->json(['message' => 'Credenciales incorrectas'], 401);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json(['user' => 'Test User']);
});

Route::post('/logout', function () {
    session()->forget('auth_token');
    return response()->json(['message' => 'Logout exitoso']);
});
