<script setup lang="ts"></script>

<template>
    <div class="-px-16">
        <h1 class="-text-2xl -mb-8">Test content</h1>
        <div class="-flex -flex-wrap --mx-8" id="test-section">
            <section class="-text-gray-900 -w-1/3 -px-4 -mb-8" v-for="i in 12">
                <h2 class="-text-xl -mb-4">What is Lorem Ipsum?</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                </p>
            </section>
        </div>
        <section>
            <img class="-w-96" src="https://source.unsplash.com/random/300×300" alt="" />
        </section>
    </div>
</template>

