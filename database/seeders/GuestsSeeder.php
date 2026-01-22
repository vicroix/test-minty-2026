<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Guest;

class GuestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        $bookings = Booking::all();

        foreach ($bookings as $booking) {
            Guest::create([
                'booking_id' => $booking->id,
                'name' => 'Juan Pérez',
                'age' => 28,
            ]);

            Guest::create([
                'booking_id' => $booking->id,
                'name' => 'María Gómez',
                'age' => 32,
            ]);
        }
    }
}
