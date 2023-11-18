import os, sys

if len(sys.argv) > 1:
    a = open("articleData/" + sys.argv[1] + ".content.html", "w+", encoding="utf8")
    t = a.read()
    t.replace("    ", "$blank4")
    a.write(t)
os.system("git add .")
os.system('git commit -m "Update"')
os.system("git push -u origin main")
