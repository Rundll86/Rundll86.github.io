import json, os
from datetime import datetime


def getProjectPath(filename="."):
    return os.path.join("data", "passages", name, filename)


name = input("name: ")
os.makedirs(getProjectPath())
json.dump(
    {"title": "Title", "time": datetime.now().strftime("%Y-%m-%d %H:%M")},
    open(getProjectPath("info.json"), "w", encoding="utf8"),
    ensure_ascii=False,
)
open(getProjectPath("content.md"), "w", encoding="utf8").close()
data: list = json.load(open("data/passages.json", encoding="utf8"))
data.append(name)
json.dump(data, open("data/passages.json", "w", encoding="utf8"), ensure_ascii=False)
