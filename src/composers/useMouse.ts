import { ref } from "vue";

let mouse = ref([0, 0]);
window.addEventListener("mousemove", (e) => {
    mouse.value = [e.clientX, e.clientY];
});

export function useMouse() {
    const result = ref([...mouse.value]);
    window.addEventListener("mousemove", (e) => {
        result.value = [e.clientX, e.clientY];
    });
    return result;
}