import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./windowConfig";

const appId = "dictionary-extension-app-container";

const pinia = createPinia();

if (document.getElementById(appId) === null) {
    const div = document.createElement("div");
    div.id = appId;
    document.body.appendChild(div);
}

createApp(App).use(pinia).mount(`#${appId}`);

