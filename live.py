import flask

app = flask.Flask(__name__)


@app.route("/<path:page>")
def root(page):
    return flask.send_file(page)


app.run("0.0.0.0", 8080)
