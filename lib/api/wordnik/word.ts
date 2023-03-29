import { wordnikAxios } from "/lib/api/axios";
import { generateResponse } from "/lib/api/response";

import type { operations } from "./schema";

type GetDefinitions = operations["getDefinitions"];

export async function getDefinitions(
    word: GetDefinitions["parameters"]["path"]["word"],
    query: GetDefinitions["parameters"]["query"]
): Promise<{
    data: GetDefinitions["responses"]["200"] | null;
    error: any;
}> {
    if (word === "") {
        return generateResponse({
            data: null,
            error: "word should not be empty",
        });
    }

    try {
        const data = await wordnikAxios.get(`/${word}/definitions`, { params: query });

        return generateResponse({
            data,
            error: null,
        });
    } catch (error) {
        return {
            data: null,
            error,
        };
    }
}

