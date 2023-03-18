import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import { createPopper } from "@popperjs/core";

export function usePopper(
    elButton: Ref<HTMLInputElement | null>,
    elTooltip: Ref<HTMLInputElement | null>,
    options: any // TODO type
) {
    // TODO type
    const popperInstance = ref<any>(null);

    onMounted(() => {
        if (!elButton.value || !elTooltip.value) return;
        popperInstance.value = createPopper(elButton.value, elTooltip.value, options);
    });

    return { popperInstance };
}

