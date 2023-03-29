const files = import.meta.glob<Record<string, string>>(["./*.ts", "!./schema.js"], { eager: true });

const modules: { [key: string]: any } = {};

for (const modulePath in files) {
    for (const name in files[modulePath]) {
        modules[name] = files[modulePath][name];
    }
}

export default { ...modules };

