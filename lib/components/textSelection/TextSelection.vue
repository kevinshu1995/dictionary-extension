<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import SelectionContainer from "./components/SelectionContainer.vue";

const selectionText = ref<string | null>(null);
const isPopupExpand = ref(false);
const popper = ref<any>(null); // TODO type

function setPopperInstance(instance: any) {
    popper.value = instance;
}

function getCurrentSelectionText(val: string) {
    selectionText.value = val;
}

function resetSelectionText() {
    selectionText.value = null;
    isPopupExpand.value = false;
}

async function openPopup() {
    isPopupExpand.value = true;
    console.log(popper.value);
    if (popper.value?.update) {
        await nextTick();
        popper.value?.update();
    }
    console.log("openPopup", selectionText.value);
}
</script>

<template>
    <SelectionContainer
        @on-popup-show="getCurrentSelectionText"
        @on-popup-hide="resetSelectionText"
        @popper="setPopperInstance"
    >
        <button class="-p-1 -shadow-2xl -bg-white -border -border-gray-200" @click="openPopup">
            <div class="-w-4 -h-4" v-show="!isPopupExpand">i</div>
            <div class="-w-80" v-show="isPopupExpand">
                REAL CONTENT! Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s
            </div>
        </button>
    </SelectionContainer>
</template>

