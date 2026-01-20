<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class MintyTestController extends Controller
{
    public function getBookings()
    {
        $bookings = Booking::all();

        return response()->json($bookings);
    }
}
