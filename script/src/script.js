const $ = require("jquery");
const projBoxes = document.getElementById("proj-boxes");
const passages = document.getElementById("passages");
const passageRenderer = document.getElementById("renderer");
function eleTree(name, child = []) {
    let res = document.createElement(name);
    for (let i in child) {
        res.appendChild(child[i].result);
    };
    return {
        /**
         * @type {HTMLElement}
         */
        result: res,
        cls(...names) {
            for (let i in names) {
                this.result.classList.add(names[i]);
            };
            return this;
        },
        innerText(text) {
            this.result.innerText = text;
            return this;
        },
        attr(n, v) {
            this.result[n] = v;
            return this;
        },
        listener(n, l) {
            this.result.addEventListener(n, l);
            return this;
        }
    };
};
function br() {
    return eleTree("br");
};
function loadPassageList(list, cb = (_) => { }) {
    let result = [];
    for (let i in list) {
        $.ajax({
            url: "/data/passages/" + list[i] + "/info.json",
            type: "get",
            success(data) {
                data.name = list[i];
                $.ajax({
                    url: "/data/passages/" + list[i] + "/content.md",
                    type: "get",
                    success(content) {
                        data.content = content;
                        result.push(data);
                        if (result.length === list.length) {
                            for (let i in result) {
                                cb(result[i]);
                            };
                        };
                    }
                });

            }
        });
    };
};
$.ajax({
    url: "/data/articles.json",
    type: "get",
    success(data) {
        projBoxes.innerHTML = "";
        let articles = data;
        for (let i in articles) {
            let currentArticle = articles[i];
            let labels = [];
            for (let j in currentArticle.labels) {
                labels.push(eleTree("span").cls("label").innerText(currentArticle.labels[j]));
            };
            projBoxes.appendChild(
                eleTree("div", [
                    eleTree("img").cls("face").attr("src", `/img/project/${currentArticle.face}.jpg`),
                    eleTree("div", [
                        eleTree("span").cls("title").innerText(currentArticle.title),
                        br(),
                        eleTree("span").cls("infos").innerText(currentArticle.info),
                        br(),
                        eleTree("span", labels).cls("labels"),
                    ]).cls("content")
                ]).cls("proj-box").listener("click", () => {
                    currentArticle.link && window.open(currentArticle.link, "_blank");
                }).result
            );
        };
    }
});
let searcher = new URLSearchParams(window.location.search);
$.ajax({
    url: "/data/passages.json",
    type: "get",
    success(data) {
        passages.innerHTML = "";
        loadPassageList(data, data => {
            let tree = eleTree("div", [
                eleTree("span").cls("title").innerText(data.title),
                eleTree("span").cls("time").innerText(data.time)
            ]).cls("passage").listener("click", () => {
                passageRenderer.contentWindow.show(data.content).then(() => {
                    passageRenderer.style.height = passageRenderer.contentWindow.document.body.offsetHeight + "px";
                    window.scrollTo({
                        left: 0,
                        top: passageRenderer.offsetTop,
                        behavior: "smooth"
                    });
                });
            }).result;
            passages.appendChild(tree);
            if (searcher.get("read")?.toLowerCase() === data.title.toLowerCase()) {
                tree.click();
            };
        });
    }
});
document.getElementById("mouse-holder").addEventListener("mouseover", () => {
    document.body.classList.add("blur");
});
document.getElementById("mouse-holder").addEventListener("mouseleave", () => {
    document.body.classList.remove("blur");
});
window.hideRenderer = () => {
    passageRenderer.style.height = "0px";
};