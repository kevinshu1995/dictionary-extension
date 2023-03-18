<script setup lang="ts">
import { ref, watch, computed, reactive, onMounted } from "vue";
import type { Ref } from "vue";
import { useTextSelection, useMouseInElement, useMousePressed } from "@vueuse/core";
import { usePopper } from "@composables/usePopper";

const { x, y } = useMouseInElement(document.body);
const { text, rects } = useTextSelection();

const emit = defineEmits(["onPopupShow", "onPopupHide", "popper"]);

const popup = {
    el: ref<HTMLInputElement | null>(null),
    elBody: ref<HTMLInputElement | null>(null),
    isShown: ref(false),
    style: reactive({
        top: "0px",
        left: "0px",
    }),
};

const { pressed: pagePressed } = useMousePressed();
const { pressed: popupPressed } = useMousePressed({ target: popup.elBody });

const isPopupAbleToShow = computed(
    () => text.value.trim() !== "" && rects.value?.[0] !== undefined
);

const { popperInstance } = usePopper(popup.el, popup.elBody, {});

function togglePopupVisibility(forceState: boolean) {
    if (forceState === undefined) {
        togglePopupVisibility(!popup.isShown.value);
        return;
    }

    forceState ? showPopup() : hidePopup();
}

function showPopup() {
    popup.style.top = `${y.value + 10}px`;
    popup.style.left = `${x.value + 10}px`;
    popup.isShown.value = true;
    if (popperInstance.value) {
        popperInstance.value.update();
    }
    emit("onPopupShow", text.value);
}

function hidePopup() {
    popup.style.top = `0px`;
    popup.style.left = `0px`;
    popup.isShown.value = false;
    emit("onPopupHide");
}

watch(popperInstance, () => {
    emit("popper", popperInstance.value);
});

watch(
    [text, pagePressed],
    () => {
        // click inside while showing popup
        if (popup.isShown.value === true && popupPressed.value === true) return;
        // select text end
        if (pagePressed.value === false) {
            togglePopupVisibility(isPopupAbleToShow.value);
        }
    },
    { immediate: true }
);
</script>

<template>
    <Teleport to="#dictionary-extension-app-container">
        <div
            :ref="popup.el"
            :class="['-absolute -z-[999999]', popup.isShown.value || '-hidden']"
            :style="popup.style"
        >
            <div :ref="popup.elBody" class="-p-2 -relative">
                <slot :is-shown="popup.isShown" />
            </div>
        </div>
    </Teleport>
</template>

