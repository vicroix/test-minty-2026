<?php

use App\Http\Controllers\GuestController;
use App\Http\Controllers\MintyTestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Endpoints used by the frontend to manage bookings and guests.
|
*/

Route::get('/bookings', [MintyTestController::class, 'getBookings']);

Route::post('/guests', [GuestController::class, 'store']);
Route::put('/guests/{guest}', [GuestController::class, 'update']);
Route::delete('/guests/{guest}', [GuestController::class, 'destroy']);