import { Ref } from "vue";
declare module "vue" {
    export interface ComponentCustomProperties {
        window: Window;
    }
}
declare global {
    interface Window {
        mouse: Ref<[number, number]>;
    }
}