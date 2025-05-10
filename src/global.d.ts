import "vue";
declare module "vue" {
    export interface ComponentCustomProperties {
        window: Window;
    }
}