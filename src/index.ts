import "./common.css";
import * as Vue from "vue";
import App from "./components/App.vue";
const app = Vue.createApp(App);
app.mixin({
    data() {
        return {
            window
        }
    }
});
app.mount("#app");