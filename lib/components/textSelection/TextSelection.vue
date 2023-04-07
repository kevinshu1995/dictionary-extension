<script setup lang="ts">
import { ref, nextTick } from "vue";
import SelectionContainer from "./components/SelectionContainer.vue";
import PopupBody from "/lib/components/popupBody/PopupBody.vue";

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
    if (isPopupExpand.value === true) return;
    isPopupExpand.value = true;
    if (popper.value?.update) {
        await nextTick();
        popper.value?.update();
    }
}
</script>

<template>
    <SelectionContainer
        @on-popup-show="getCurrentSelectionText"
        @on-popup-hide="resetSelectionText"
        @popper="setPopperInstance"
    >
        <button @click="openPopup">
            <div class="-bg-white -w-4 -h-4 -p-1 -shadow-2xl" v-show="!isPopupExpand">i</div>
            <div class="-cursor-auto" v-show="isPopupExpand">
                <PopupBody :selected-word="selectionText" :is-popup-expand="isPopupExpand" />
            </div>
        </button>
    </SelectionContainer>
</template>

