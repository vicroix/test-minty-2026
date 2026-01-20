<?php

use App\Http\Controllers\MintyTestController;
use Illuminate\Support\Facades\Route;

Route::get('/bookings', [MintyTestController::class, 'getBookings']);
