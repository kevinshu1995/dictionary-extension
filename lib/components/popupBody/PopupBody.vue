<script setup lang="ts">
import { ref, watch } from "vue";
import { useLookupText } from "/lib/store/useLookupText";

const storeLookupText = useLookupText();

const props = defineProps<{
    selectedWord: string | null;
    isPopupExpand: boolean;
}>();

watch(
    () => props.isPopupExpand,
    async () => {
        if (props.isPopupExpand) {
            getDefinitions();
        }
    }
);

async function getDefinitions() {
    if (props.selectedWord === null) return;
    const { data } = await storeLookupText.getDefinitions(props.selectedWord);
    console.log({ data });
}
</script>

<template>
    <div
        class="-shadow-2xl -bg-white -text-left -divide-y -text-gray-600 -rounded-xl -border -border-gray-300 -w-[500px] -overflow-hidden"
    >
        <div class="-p-4 -space-y-2 -flex -justify-between -items-center">
            <h3 class="-font-bold -text-lg -text-gray-900">{{ props.selectedWord }}</h3>

            <div class=""></div>
        </div>

        <div class="-max-h-[500px] -overflow-y-auto -p-4 -space-y-4">
            <div>
                <div class="-italic -text-xs"></div>
            </div>

            <div class="-space-y-6"></div>
        </div>
    </div>
</template>

