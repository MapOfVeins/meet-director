from app import app
from flask import make_response


@app.route('/')
@app.route('/index')
def index():
    # return make_response(open('app/templates/index.html').read())
    return make_response(open('app/templates/create.html').read())


@app.route('/create')
def create():
    return make_response(open('app/templates/create.html').read())


@app.route('/about')
def about():
    pass


@app.route('/contact')
def contact():
    pass
