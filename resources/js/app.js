import { createApp } from "vue";
import App from "./components/App.vue";
import router from "./router";

import store from "./components/store";

const app = createApp(App);

app.use(router);
app.use(store);

router.isReady().then(() => {
    app.mount("#app");
});