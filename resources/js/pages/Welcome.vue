<script setup>
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import moment from 'moment';

import { useMintyTestStore } from '../stores/minty-test';

import { onMounted } from 'vue';

const { t } = useI18n();
const store = useMintyTestStore();

onMounted(() => {
    store.getBookings();
});
</script>

<template>
    <div class="flex flex-col gap-10">

        <Head title="Minty Test 2026" />
        <div class="border-b">
            <h1 class="flex justify-center py-5 text-xl">Wookings</h1>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Iterate over all bookings -->
            <div v-for="booking in store.bookings" :key="booking.id"
                class="rounded border p-4 shadow transition-all duration-200 ease-in-out hover:bg-amber-100/55 hover:shadow-lg">
                <p><strong>ID:</strong> {{ booking.id }}</p>
                <p><strong>Check-in:</strong> {{ booking.checkin_at }}</p>
                <p><strong>Check-out:</strong> {{ booking.checkout_at }}</p>

                <!-- Guests -->
                <div class="flex flex-col gap-4 mt-4  border-t">
                    <div class="flex items-center gap-1 mt-4">
                        <strong>Guests:</strong>
                        <button class="cursor-pointer" title="Add guest">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20"
                                class="text-green-600">
                                <path fill="currentColor"
                                    d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4.257a5.5 5.5 0 0 1-1.242-3.084c-.634-.115-1.166-.348-1.58-.684A2.5 2.5 0 0 1 6.5 12.25c0-.69.56-1.25 1.25-1.25h2.507A5.49 5.49 0 0 1 14.5 9a5.5 5.5 0 0 1 1.5.207V4a2 2 0 0 0-2-2zm2.5 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1M8 8a2 2 0 1 1 4 0a2 2 0 0 1-4 0m11 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15z" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex">
                        <ul class="flex flex-col gap-2 ml-4">
                            <li v-for="guest in booking.guests" :key="guest.id"
                                class="flex items-center justify-between gap-4 p-2 hover:bg-blue-300/45 rounded-lg border-b border-b-transparent transition-all duration-300">
                                <div>
                                    {{ guest.name }} <span v-if="guest.age">({{ guest.age }} años)</span>
                                </div>
                                <div class="flex gap-3">
                                    <button title="Guest edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"
                                            class="cursor-pointer text-blue-600">
                                            <path fill="currentColor"
                                                d="M36.4 353.2c4.1-14.6 11.8-27.9 22.6-38.7l181.2-181.2l33.9-33.9l104 104l33.9 33.9l-33.9 33.9l-181.2 181.2c-10.7 10.7-24.1 18.5-38.7 22.6L30.4 510.6c-8.3 2.3-17.3 0-23.4-6.2S-1.4 489.3.9 481zm55.6-3.7c-4.4 4.7-7.6 10.4-9.3 16.6L58.6 453l86.9-24.1c6.4-1.8 12.2-5.1 17-9.7l-70.6-69.7zm354-146.1l-104-104l-34-33.9l44.9-44.9C366.4 7 384.8-.6 404-.6s37.6 7.6 51.1 21.2l35.7 35.7c13.6 13.6 21.2 32 21.2 51.1s-7.6 37.6-21.2 51.1l-44.9 44.9z" />
                                        </svg>
                                    </button>
                                    <button title="Remove guest">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="cursor-pointer text-red-500"
                                            viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Future buttons -->
                <div class="mt-2 flex gap-2"></div>
            </div>
        </div>
    </div>
</template>
