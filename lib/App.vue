<script setup lang="ts">
const isDev = import.meta.env.DEV;
</script>

<template>
    <div v-if="isDev">
        <section class="-text-gray-600">Testing section</section>
    </div>
</template>

