import type { Axios } from "axios";
import type {
    OnResponseFulfilled,
    OnRequestFulfilled,
    OnRejected,
    InterceptorScaffold,
} from "./types";

export class Interceptors {
    axiosInstance: null | Axios = null;
    constructor(axios: Axios) {
        this.axiosInstance = axios;
    }

    get axios() {
        return this.axiosInstance;
    }

    apply(interceptorObject: InterceptorScaffold) {
        this.request(interceptorObject.request);
        this.response(interceptorObject.response);
        return this;
    }

    request(requestFunctionObject?: InterceptorScaffold["request"]) {
        if (requestFunctionObject === undefined) return;

        this.requestInterceptors(
            requestFunctionObject.onFulfilled,
            requestFunctionObject.onRejected
        );
        return this;
    }

    response(requestFunctionObject?: InterceptorScaffold["response"]) {
        if (requestFunctionObject === undefined) return;

        this.responseInterceptors(
            requestFunctionObject.onFulfilled,
            requestFunctionObject.onRejected
        );
        return this;
    }

    requestInterceptors(onFulfilled: OnRequestFulfilled, onRejected: OnRejected) {
        if (this.axiosInstance === null) return;
        this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);
        return this;
    }

    responseInterceptors(onFulfilled: OnResponseFulfilled, onRejected: OnRejected) {
        if (this.axiosInstance === null) return;
        this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
        return this;
    }
}

