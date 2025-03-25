<?php

use App\Http\Controllers\SiteController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'userId' => auth()->id()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [SiteController::class, 'index'])->name('sites.list');
    Route::get('/sites/add', function () {
        return Inertia::render('SiteAdd');
    })->name('sites.add');
    Route::post('/sites/add', [SiteController::class, 'create'])->name('sites.create');
});

require __DIR__ . '/auth.php';
