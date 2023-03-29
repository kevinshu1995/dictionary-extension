import type { InterceptorScaffold } from "./types";

export const PrintLog: InterceptorScaffold = {
    request: {
        onFulfilled(configs) {
            return configs;
        },
        onRejected(error) {
            if (import.meta.env.DEV || window.__dictionary_extension__.axiosLog) {
                console.error("[axios request error] ", error);
            }
            return Promise.reject(error);
        },
    },
    response: {
        onFulfilled(configs) {
            return configs;
        },
        onRejected(error) {
            if (import.meta.env.DEV || window.__dictionary_extension__.axiosLog) {
                console.error("[axios response error] ", error);
            }
            return Promise.reject(error);
        },
    },
};

