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
    <Head title="Minty Test 2026" />

    <div class="flex flex-col items-center gap-4 m-4">
        <h1 class="text-2xl font-bold">{{ t('welcome.title') }} {{ store.testUser }}</h1>
        <p class="text-gray-500">{{ t('welcome.subtitle') }}</p>

        <div class="grid grid-cols-2 gap-4 w-[40%]">
            <div v-for="booking in store.bookings" :key="booking.id">
                <h2 class="text-lg font-bold">{{ booking.id }}</h2>
                <p class="text-gray-500">{{ moment(booking.checkin_at).format('DD/MM/YYYY') }}</p>
                <p class="text-gray-500">{{ moment(booking.checkout_at).format('DD/MM/YYYY') }}</p>
            </div>
        </div>
    </div>
</template>
