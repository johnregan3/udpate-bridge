<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\SiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/token', [AuthController::class, 'generateToken']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('/sites', SiteController::class);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
