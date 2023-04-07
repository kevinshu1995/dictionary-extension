import type { InterceptorScaffold } from "./types";

const apiKeyThesaurus = import.meta.env.VITE_MERRIAM_WEBSTER_THESAURUS_API_KEY;
const apiKeyCollegiate = import.meta.env.VITE_MERRIAM_WEBSTER_COLLEGIATE_API_KEY;

export const Thesaurus: InterceptorScaffold = {
    request: {
        onFulfilled(configs) {
            // * add api key
            configs.params = { ...configs.params, key: apiKeyThesaurus };
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

export const Collegiate: InterceptorScaffold = {
    request: {
        onFulfilled(configs) {
            // * add api key
            configs.params = { ...configs.params, key: apiKeyCollegiate };
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

