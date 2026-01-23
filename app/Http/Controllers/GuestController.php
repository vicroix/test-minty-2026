<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guest;

class GuestController extends Controller
{
    /**
     * Store a newly created guest in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'name' => 'required|string|max:255',
            'age' => 'nullable|integer|min:0'
        ]);

        $guest = Guest::create([
            'booking_id' => $request->booking_id,
            'name' => $request->name,
            'age' => $request->age
        ]);

        return response()->json($guest);
    }

    /**
     * Update the specified guest in storage.
     */
    public function update(Request $request, Guest $guest)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'nullable|integer|min:0'
        ]);

        $guest->update($request->only('name', 'age'));

        return response()->json(['message' => 'Guest updated successfully']);
    }

    /**
     * Remove the specified guest from storage.
     */
    public function destroy(Guest $guest)
    {
        $guest->delete();
        return response()->json(['message' => 'Guest remove successfully']);
    }
}
