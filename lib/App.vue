<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import TextSelection from "./components/textSelection/TextSelection.vue";
import Wordnik from "/lib/api/wordnik";
import type { Definition } from "/lib/api/wordnik/word";

async function getDefinitions() {
    const { data, error } = await Wordnik.getDefinitions("test");

    if (error) {
        return;
    }

    // 依據 sourceDictionary 分類
    const definitionsDivideBySource = data.reduce(
        (all: { [key: string]: Definition[] }, curr: Definition) => {
            const sourceDictionary = curr.sourceDictionary;

            if (sourceDictionary !== undefined) {
                const target = all[sourceDictionary];
                target ? target.push(curr) : (all[sourceDictionary] = [curr]);
            } else {
                const target = all.sourceNotFound;
                target ? target.push(curr) : (all.sourceNotFound = [curr]);
            }

            return all;
        },
        {}
    );

    console.log({ definitionsDivideBySource });
}

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

