import { ref, computed } from "vue";
import { defineStore } from "pinia";
import dictionaryApi from "../api/merriamWebster";
// import type { Definitions } from "../api/merriamWebster/schema";

type PromiseResponse = Promise<{ data: any; error: any; [key: string]: any }>;

export const useDefinitions = defineStore("definitions", () => {
    const currWord = ref<string | null>(null); // scoped here, don't expose
    const currDefinitions = ref<any | null>(null);

    async function getDefinitions(word: string): PromiseResponse {
        if (currWord.value === word) return { data: currDefinitions.value, error: null };

        const response = await dictionaryApi.getCollegiate(word);

        if (response.error) {
            reset();
            return response;
        }

        currDefinitions.value = response.data;
        currWord.value = word;
        return response;
    }

    function reset() {
        currWord.value = null;
        currDefinitions.value = null;
    }

    return {
        currDefinitions,

        getDefinitions,
        reset,
    };
});

