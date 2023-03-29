export {};

declare global {
    interface Window {
        __dictionary_extension__: {
            [key: string]: any;
        };
    }
}

