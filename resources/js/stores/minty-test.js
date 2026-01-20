import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMintyTestStore = defineStore('minty-test', () => {
    // State
    const testUser = ref('Candidato/a');
    const bookings = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // Actions
    async function getBookings() {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch('/api/bookings');

            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }

            const data = await response.json();
            bookings.value = data;
        } catch (err) {
            error.value = err.message;
            console.error('Error fetching bookings:', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        // State
        testUser,
        bookings,
        loading,
        error,
        // Actions
        getBookings,
    };
});
