import "./common.css";
import * as Vue from "vue";
import App from "./components/App.vue";
// import Fallen from "./components/Fallen.vue";

const app = Vue.createApp(App);
app.mixin({
    data() {
        return {
            window
        };
    }
});
app.mount("#app");

for (let i = 0; i < 3; i++) {
    console.log("你们搞大模型的就是码奸，你们已经害死前端兄弟了，还要害死后端兄弟，测试兄弟，运维兄弟，最后害死自己，害死全人类。💔💔💔😭");
    console.log("-");
}
