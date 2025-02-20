<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', function (Request $request) {
    // Token aleatorio (luego este token vendría de una BD)
    $token = Str::random(60);

    return response()->json([
        'token' => $token
    ]);
});

Route::middleware('auth.token')->get('/perfil', function (Request $request) {
    return response()->json([
        'mensaje' => 'Accediste con un token válido',
    ]);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
