<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(auth()->user())
    {
        return redirect()->route('dashboard');
    }else{
    return Inertia::render('Auth/Login');
    }
});

Route::get('/test' , [\App\Http\Controllers\userController::class , 'test']);

Route::get('/users' , [\App\Http\Controllers\userController::class , 'index'] )->name('user.index');

Route::middleware('auth')->group(function () {
    //dashboard Routes
    Route::get('/dashboard' , [\App\Http\Controllers\DashboardController::class , 'index'])->name('dashboard');

    //profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Categories Routes
    Route::get('/category' , [\App\Http\Controllers\CategoryController::class , 'index'])->name('category.index');
    Route::get('/category/create' , [\App\Http\Controllers\CategoryController::class , 'create'])->name('category.create');
    Route::post('category/store' , [\App\Http\Controllers\CategoryController::class , 'store'])->name('category.store');
    Route::delete('category/delete/{id}' , [\App\Http\Controllers\CategoryController::class , 'destroy'])->name('category.destroy');
    Route::get('/category/{id}' , [\App\Http\Controllers\CategoryController::class , 'edit'])->name('category.edit');

    //Transactions Routes
    Route::get('/transactions' , [\App\Http\Controllers\TransactionsController::class , 'index'])->name('transactions.index');
    Route::get('/transactions/create' , [\App\Http\Controllers\TransactionsController::class , 'create'])->name('transactions.create');
    Route::post('/transactions/store' , [\App\Http\Controllers\TransactionsController::class , 'store'])->name('transactions.store');
    Route::delete('/transactions/destroy/{id}', [\App\Http\Controllers\TransactionsController::class , 'destroy'])->name('transactions.destroy');

    //init value
    Route::get('/initial-amount' , [\App\Http\Controllers\TransactionsController::class , 'initialAmount'])->name('initial-amount.index');
    Route::post('/initial-amount' , [\App\Http\Controllers\TransactionsController::class , 'initialAmountUpdate'])->name('initial-amount.update');
});

require __DIR__.'/auth.php';
