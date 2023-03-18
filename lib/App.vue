<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const isDev = import.meta.env.DEV;
</script>

<template>
    <div v-if="isDev">
        <component :is="defineAsyncComponent(() => import('./components/TestSection.vue'))" />
    </div>
</template>

