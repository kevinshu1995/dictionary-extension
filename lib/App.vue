<script setup lang="ts">
const isDev = import.meta.env.DEV;
</script>

<template>
    <div v-if="isDev">
        <section>Testing section</section>
    </div>
</template>

<style scoped></style>

