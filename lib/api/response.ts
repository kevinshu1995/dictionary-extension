import type { AxiosResponse } from "axios";

interface ResponseReturn {
    status: number;
    data: AxiosResponse["data"] | null;
    error: any;
}

interface ResponseArguments {
    data: AxiosResponse | null;
    error: any;
    [key: string]: any;
}

export function generateResponse({ data, error }: ResponseArguments): ResponseReturn {
    return {
        data: data?.data ?? null,
        status: data?.status ?? 5000,
        error: error ?? null,
    };
}

