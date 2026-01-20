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
    </div>
</template>