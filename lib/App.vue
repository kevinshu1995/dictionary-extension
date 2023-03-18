<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import TextSelection from "./components/textSelection/TextSelection.vue";

const isDev = import.meta.env.DEV;
</script>

<template>
    <div id="tailwind-preflight-container">
        <div v-if="isDev">
            <component :is="defineAsyncComponent(() => import('./components/TestSection.vue'))" />
        </div>
    </div>
    <TextSelection />
</template>

