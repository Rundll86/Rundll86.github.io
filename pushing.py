import os, sys

if len(sys.argv) > 1:
    a = open("articleData/" + sys.argv[1] + ".content.html", "r", encoding="utf8")
    t = a.read()
    t = t.replace("    ", "$blank4")
    a.close()
    a = open("articleData/" + sys.argv[1] + ".content.html", "w", encoding="utf8")
    a.write(t)
    a.close()
os.system("git add .")
os.system('git commit -m "Update"')
os.system("git push -u origin main")
