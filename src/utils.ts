export async function copy(data: string) {
    try {
        await window.navigator.clipboard.writeText(data);
    } catch {
        alert("复制失败。");
    }
}
export function openWebsite(url?: string) {
    if (url) window.open(url, "_blank");
}