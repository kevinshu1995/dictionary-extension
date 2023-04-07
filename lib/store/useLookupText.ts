import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useDefinitions } from "./useDefinitions";

export const useLookupText = defineStore("lookupText", () => {
    const currWord = ref<string | null>(null);

    const storeDefinitions = useDefinitions();
    const definition = storeToRefs(storeDefinitions);
    // const { currDefinitions } = definition;

    async function getDefinitions(word: string) {
        const response = await storeDefinitions.getDefinitions(word);
        if (response.error) {
            reset();
            return response;
        }
        currWord.value = word;
        return response;
    }

    function reset() {
        currWord.value = null;
        storeDefinitions.reset();
    }

    return {
        definition,

        getDefinitions,
    };
});

