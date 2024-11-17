const marked = require("marked");
const { default: hljs } = require("highlight.js");
const renderer = document.getElementById("renderer");
const _ = require("highlight.js/styles/vs2015.min.css");
marked.setOptions({
    highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'javascript';
        return hljs.highlight(code, { language: validLanguage }).value;
    },
});
window.show = content => {
    renderer.innerHTML = marked.marked(content);
    hljs.highlightAll();
};