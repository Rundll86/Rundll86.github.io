import json, os,shutil
from datetime import datetime


def getProjectPath(filename="."):
    return os.path.join("data", "passages", name, filename)


name = input("name: ")
shutil.rmtree(getProjectPath())
data: list = json.load(open("data/passages.json", encoding="utf8"))
data.remove(name)
json.dump(data, open("data/passages.json", "w", encoding="utf8"), ensure_ascii=False)
