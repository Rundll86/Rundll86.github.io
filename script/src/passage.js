const marked = require("marked");
const { default: hljs } = require("highlight.js");
const renderer = document.getElementById("renderer");
const overlay = document.getElementById("overlay");
const btn = document.getElementById("btn");
require("highlight.js/styles/vs2015.min.css");
btn.addEventListener("click", () => {
    top.hideRenderer();
});
window.show = async content => {
    renderer.innerHTML = "";
    overlay.classList.remove("hide");
    let totalContent = 0;
    let loadedContent = 0;
    renderer.innerHTML = await marked.marked(content, { async: true });
    hljs.highlightAll();
    return new Promise(resolve => {
        let contents = renderer.querySelectorAll("img,iframe");
        totalContent = contents.length;
        if (totalContent === 0) {
            overlay.classList.add("hide");
            resolve();
        } else {
            contents.forEach(img => {
                function _loaded() {
                    loadedContent++;
                    if (loadedContent === totalContent) {
                        overlay.classList.add("hide");
                        resolve();
                    };
                };
                img.addEventListener("load", _loaded);
                img.addEventListener("error", _loaded);
            });
        };
        renderer.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", e => {
                e.preventDefault();
                top.open(a.href, "_blank");
            });
        });
    });
};