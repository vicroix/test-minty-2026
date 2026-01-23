import { defineStore } from 'pinia';

export const useMintyTestStore = defineStore('minty-test', {
    state: () => ({
        testUser: 'Candidato/a',
        bookings: [],
    }),

    actions: {
        /**
         * Display a listing of bookings with their guests.
         */
        async getBookings() {
            try {
                const response = await fetch('/api/bookings');

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                this.bookings = data;
            } catch (err) {
                console.error('Error fetching bookings:', err);
            }
        },

        /**
         * Create a new guest linked to a booking.
         *
         * @param {number} bookingId
         * @param {Object} guest
         */
        async addGuest(bookingId, guest) {
            try {
                const response = await fetch('/api/guests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({
                        booking_id: Number(bookingId),
                        ...guest,
                    }),
                });

                const text = await response.text();
                console.log('Response text:', text);

                if (response.ok) {
                    const result = JSON.parse(text);
                    console.log('Guest created:', result);
                } else {
                    console.error('Failed to create guest');
                }

                await this.getBookings();
            } catch (err) {
                console.error('Error creating guest:', err);
            }
        },

        /**
         * Update an existing guest.
         *
         * @param {number} guestId
         * @param {Object} guest
         */
        async updateGuest(guestId, guest) {
            try {
                const response = await fetch(`/api/guests/${guestId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(guest),
                });

                if (!response.ok) {
                    throw new Error('Failed to update guest');
                }

                await this.getBookings();
            } catch (err) {
                console.error('Error updating guest:', err);
            }
        },

        /**
         * Delete a guest by ID.
         *
         * @param {number} guestId
         */
        async deleteGuest(guestId) {
            try {
                const response = await fetch(`/api/guests/${guestId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete guest');
                }
            } catch (err) {
                console.error('Error deleting guest:', err);
            }
        },
    },
});
