import type { InterceptorScaffold } from "./types";

const apiKey = import.meta.env.VITE_WORDNIK_API_KEY;

export const Wordnik: InterceptorScaffold = {
    request: {
        onFulfilled(configs) {
            // * add api key
            configs.params = { ...configs.params, api_key: apiKey };
            return configs;
        },
        onRejected(error) {
            return Promise.reject(error);
        },
    },
    response: {
        onFulfilled(configs) {
            return configs;
        },
        onRejected(error) {
            return Promise.reject(error);
        },
    },
};

