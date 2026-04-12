// import "./common.css";
import * as Vue from "vue";
// import App from "./components/App.vue";
import Fallen from "./components/Fallen.vue";

const app = Vue.createApp(Fallen);
app.mixin({
    data() {
        return {
            window
        };
    }
});
app.mount("#app");
