<script setup>
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import moment from 'moment';

import { useMintyTestStore } from '../stores/minty-test';

import { onMounted, ref } from 'vue';


const store = useMintyTestStore();
const { t } = useI18n();

const showGuestModal = ref(false);
const modalMode = ref('create');
const selectedBookingId = ref(null);
const selectedGuest = ref(null);
const nameError = ref('');
const isLoadingBookings = ref(false);
const totalBookings = ref(null);
const totalPages = ref(null);
const currentPage = ref(9);
const currentPageReservations = ref(null);

const guestForm = ref({
    name: '',
    age: '',
});

/**
 * Open modal to create a new guest.
 *
 * @param {number} bookingId
 */
function openCreateGuestModal(bookingId) {
    modalMode.value = 'create';
    selectedBookingId.value = bookingId;
    selectedGuest.value = null;
    guestForm.value = { name: '', age: null };
    showGuestModal.value = true;
}

/**
 * Open modal to edit an existing guest.
 *
 * @param {number} bookingId
 * @param {Object} guest
 */
function openEditGuestModal(bookingId, guest) {
    modalMode.value = 'edit';
    selectedBookingId.value = bookingId;
    selectedGuest.value = guest;
    guestForm.value = { name: guest.name, age: guest.age };
    showGuestModal.value = true;
}

/**
 * Delete a guest from a booking.
 *
 * @param {number} guestId
 */
async function deleteGuestFromBooking(guestId) {

    const confirmed = confirm(
        'Are you sure you want to remove this guest? This action cannot be undone.'
    )

    if (!confirmed) return

    try {
        isLoadingBookings.value = true;
        await store.deleteGuest(guestId);
        await store.getBookings();
        isLoadingBookings.value = false;
        console.log('Guest deleted:', guestId);
    } catch (err) {
        console.error('Error deleting guest:', err);
    }
}

/**
 * Submit guest form (create or update).
 */
async function submitGuestForm() {
    try {
        if (!guestForm.value.name?.trim()) {
            nameError.value = 'Name is required';

            setTimeout(() => {
                nameError.value = '';
            }, 3000)
            return;
        }
        nameError.value = '';
        isLoadingBookings.value = true;
        if (modalMode.value === 'create') {

            await store.addGuest(selectedBookingId.value, {
                ...guestForm.value,
                booking_id: selectedBookingId.value
            });
        } else {
            await store.updateGuest(selectedGuest.value.id, guestForm.value);
        }
        closeGuestModal();
    } catch (err) {
        console.error(err);
    } finally {
        isLoadingBookings.value = false;
    }
}

/**
 * Close guest modal and reset state.
 */
function closeGuestModal() {
    showGuestModal.value = false;
    selectedGuest.value = null;
};

function saveCurrentPage(page){
    currentPage.value = page;
    countBookingPages();
}

function countBookingPages() {
    // calculate total number of pages
    totalBookings.value = store.bookings.length;
    totalPages.value = Math.ceil(totalBookings.value / 6);

    //Show current page
    for (let index = 1; index <= totalPages.value; index++) {
        let start = 0;
        let end = 0;
        if (index === currentPage.value) {
            end = 6 * index;
            start = end - 6;
            console.log(`Page: ${index}, Start: ${start}, End: ${end}`);
            currentPageReservations.value = store.bookings.slice(start, end);
            console.log(currentPageReservations);
            return;
        }
    }
}

/*
|--------------------------------------------------------------------------
| Initial data load
|--------------------------------------------------------------------------
|
| Fetch bookings when the page is mounted.
|
*/
onMounted((async () => {
    isLoadingBookings.value = true;
    await store.getBookings();
    countBookingPages();
    isLoadingBookings.value = false;
}));
</script>

<template>
    <div class="relative flex flex-col gap-10 container mx-auto px-auto py-8">

        <Head title="Minty Test 2026" />
        <header class="text-center mb-12">
            <h1 class="flex justify-center text-4xl md:text-5xl font-bold text-primary tracking-tight">Manage
                Bookings</h1>
            <p class="text-muted-foreground mt-2 text-lg">Your modern booking management dashboard.</p>
        </header>

        <div class="flex gap-6 overflow-hidden justify-center">
            <!-- Iterate over all bookings -->
            <div v-for="booking in currentPageReservations" :key="booking.id"
                class="flex flex-col gap-3 card h-full rounded-xl p-2 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div class="flex flex-col gap-3">
                    <p class="text-sm text-muted-foreground"><strong class="text-black">Booking ID:</strong> {{
                        booking.id }}
                    </p>
                    <div class="flex flex-col gap-1">
                        <p class="text-sm text-muted-foreground"><strong class="text-black">Check-in:</strong> {{
                            booking.checkin_at }}</p>
                        <p class="text-sm text-muted-foreground"><strong class="text-black">Check-out:</strong> {{
                            booking.checkout_at }}</p>
                    </div>
                </div>

                <div class="bg-border w-full h-0.5"></div>

                <!-- Guests -->
                <div class="flex flex-col gap-4">
                    <div class="flex justify-between items-center gap-1 mt-4">
                        <h4 class="font-semibold font-headline text-lg flex items-center gap-2"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-users w-5 h-5">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>Guests</h4>
                        <button @click="openCreateGuestModal(booking.id)"
                            class="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm btn-item-actions h-9 rounded-md px-3"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-user-plus h-4 w-4 mr-2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <line x1="19" x2="19" y1="8" y2="14"></line>
                                <line x1="22" x2="16" y1="11" y2="11"></line>
                            </svg>Add Guest
                        </button>
                    </div>
                    <div class="flex flex-col gap-3 ">
                        <div v-for="guest in booking.guests" :key="guest.id"
                            class="flex justify-between p-2 rounded-md  items-center bg-accent">
                            <div>
                                <p v-if="guest.name" class="font-medium text-sm">{{ guest.name }}</p>
                                <p v-if="guest.age" class="text-xs text-muted-foreground">{{ guest.age }}
                                    years old</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <button @click="openEditGuestModal(booking.id, guest)"
                                    class="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm btn-edit-guest h-8 w-8"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-pencil h-4 w-4">
                                        <path
                                            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                                        </path>
                                        <path d="m15 5 4 4"></path>
                                    </svg>
                                </button>
                                <button @click="deleteGuestFromBooking(guest.id)"
                                    class="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-red-600 rounded-md btn-delete-guest text-sm h-8 w-8"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" x2="10" y1="11" y2="17"></line>
                                        <line x1="14" x2="14" y1="11" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <div class="flex gap-8 justify-center">
        <template v-for="page in totalPages">
            <button @click="saveCurrentPage(page)" class="cursor-pointer text-lg hover:text-blue-500">{{ page }}</button>
        </template>
    </div>

    <!-- Spinner loading -->
    <div v-show="isLoadingBookings" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div class="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-lg">
            <svg class="animate-spin color-sping h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>

            <span class="text-base font-medium text-gray-700">
                Cargando…
            </span>
        </div>
    </div>

    <!-- Reusable modal for create / edit guest -->
    <!-- Modal Overlay -->
    <div v-if="showGuestModal" class="modal-overlay fixed inset-0 flex justify-center items-center z-40">

        <!-- Modal Content -->
        <div class="flex flex-col gap-8 modal-content rounded-lg shadow-lg p-7 w-full max-w-lg">
            <div>
                <h2 class="text-lg font-bold">
                    {{ modalMode === 'create' ? 'Add Guest' : 'Edit Guest' }}
                </h2>
                <p class="text-muted-foreground text-sm">
                    {{
                        modalMode === 'create' ? "Enter the new guest's details." : "Update the guest's details below."
                    }}
                </p>
            </div>

            <form @submit.prevent="submitGuestForm" class="flex flex-col gap-3">
                <div class="mb-3">
                    <label class="block mb-1 text-sm">Name</label>
                    <input v-model="guestForm.name" type="text" class="w-full text-sm px-2 py-2 mt-1.5 input"
                        placeholder="e.g.Antonio Perez" minlength="1" pattern="[A-Za-zÀ-ÿ\s]+"
                        @input="guestForm.name = guestForm.name.replace(/[0-9]/g, '')" />
                    <p v-show="nameError" class="text-sm text-red-600 mt-1 ml-2 min-h-5">{{ nameError || ' ' }}</p>
                </div>
                <div class="mb-3">
                    <label class="block mb-1 text-sm">Age</label>
                    <input v-model="guestForm.age" type="number" class="w-full text-sm px-2 mt-1.5 py-2 input"
                        placeholder="e.g.35" min="0" max="120" maxlength="3"
                        @input="guestForm.age = guestForm.age?.toString().slice(0, 3).replace(/\D/g, '')" />
                </div>

                <div class="flex justify-end gap-2 mt-4">
                    <button type="button" @click="closeGuestModal"
                        class="cursor-pointer text-sm px-3 py-2 rounded btn-item-actions">Cancel</button>
                    <button type="submit" class="cursor-pointer text-sm px-3 py-2 rounded btn-submit" :disabled="false">
                        {{ modalMode === 'create' ? 'Save' : 'Update' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
