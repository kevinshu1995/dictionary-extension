import { wordnikAxios } from "/lib/api/axios";
import { generateResponse } from "/lib/api/response";

import type { operations, definitions } from "./schema";

// TODO api getAudio 音檔
export async function getAudio() {}

type GetDefinitions = operations["getDefinitions"];

type OriginDefinition = definitions["Definition"];

export interface Definition extends OriginDefinition {
    exampleUses?: { [key: string]: any }[] | undefined;
}

// TODO api getDefinitions 定義
export async function getDefinitions(
    word: GetDefinitions["parameters"]["path"]["word"],
    query: GetDefinitions["parameters"]["query"]
): Promise<{
    data: GetDefinitions["responses"]["200"]["schema"] | null;
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
        return generateResponse({
            data: null,
            error,
        });
    }
}

// TODO api getExamples 取得範例
export async function getExamples() {}

// TODO api getFrequency 文字使用次數
export async function getFrequency() {}

// TODO api getPronunciations 音標
export async function getPronunciations() {}

// TODO api getRelatedWords 關聯字
export async function getRelatedWords() {}

