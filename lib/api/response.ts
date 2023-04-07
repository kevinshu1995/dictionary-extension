import type { AxiosResponse } from "axios";

export interface ResponseReturn<T> {
    status: number;
    data: T | AxiosResponse["data"] | null;
    error: any;
}

interface ResponseArguments {
    data: AxiosResponse | null;
    error: any;
    [key: string]: any;
}

export function generateResponse({
    data,
    error,
}: ResponseArguments): ResponseReturn<ResponseArguments["data"]> {
    return {
        data: data?.data ?? null,
        status: data?.status ?? 5000,
        error: error ?? null,
    };
}

