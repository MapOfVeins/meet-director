from app import app
from flask import make_response


@app.route('/')
@app.route('/index')
def index():
    return make_response(open('app/templates/index.html').read())
