import { merriamWebsterThesaurusAxios, merriamWebsterCollegiate } from "/lib/api/axios";
import { generateResponse } from "/lib/api/response";
import type { ResponseReturn } from "/lib/api/response";

// import type { Operations } from "./schema";

export async function getCollegiate(word: string): Promise<ResponseReturn<any[] | null>> {
    if (word === "") {
        return generateResponse({
            data: null,
            error: "word should not be empty",
        });
    }

    try {
        const data = await merriamWebsterCollegiate.get(`/${word}`);

        return generateResponse({
            data,
            error: null,
        });
    } catch (error) {
        return generateResponse({
            data: null,
            error,
        });
    }
}

export async function getThesaurus(word: string): Promise<ResponseReturn<any[] | null>> {
    if (word === "") {
        return generateResponse({
            data: null,
            error: "word should not be empty",
        });
    }

    try {
        const data = await merriamWebsterThesaurusAxios.get(`/${word}`);

        return generateResponse({
            data,
            error: null,
        });
    } catch (error) {
        return generateResponse({
            data: null,
            error,
        });
    }
}

