<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

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
    return view('login');
});

Route::post('/', [AuthController::class, 'login']);

Route::get('/logout', [AuthController::class, 'logout']);

Route::get('/nolog', function () {
    return view('nolog');
});

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::get('/dashboard/clientes', [DashboardController::class, 'clientes']);

Route::post('/dashboard/clientes', [DashboardController::class, 'guardarcliente']);

Route::post('/dashboard/buscarclientes',  [DashboardController::class, 'buscarclientes']);