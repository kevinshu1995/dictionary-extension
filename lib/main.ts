import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./windowConfig";

const appId = "dictionary-extension-app-container";

if (document.getElementById(appId) === null) {
    const div = document.createElement("div");
    div.id = appId;
    document.body.appendChild(div);
}

createApp(App).mount(`#${appId}`);

