import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

export type InterceptorFulFilled<V> = (value: V) => V | Promise<V>;
export type InterceptorRejected = (error: any) => Promise<never>;

export type OnResponseFulfilled = InterceptorFulFilled<AxiosResponse>;
export type OnRequestFulfilled = InterceptorFulFilled<InternalAxiosRequestConfig>;
export type OnRejected = InterceptorRejected;

export type InterceptorScaffold = {
    request?: {
        onFulfilled: OnRequestFulfilled;
        onRejected: OnRejected;
    };
    response?: {
        onFulfilled: OnResponseFulfilled;
        onRejected: OnRejected;
    };
};

