# MEET DIRECTOR #

Meet Director is a single page web app for creating, hosting, and running a powerlifting meet. MD Runs on Flask, AngularJS, and Sass.

Note: Not being actively developed anymore, MD is operational but not necessarily complete -_-

### Features ###

* Automatic lifter and flight setup (you can still make your own schedule).
* Lift result recording, live total calculations and rankings.
* Full control of attempts, order, and lift recording.
* Free, no excel required.

### Requirements ###

* [Flask](http://flask.pocoo.org/)
* [Sass](http://sass-lang.com/install)
* AngularJS minified script is included here

### Installation ###
* Install Flask and Sass from the links above.
* From the meet-director directory, compile sass using the following:
      `$ sass app/static/sass/base.scss app/static/css/base.css`
* From the meet-director directory, type `$ ./run.py`
* In a browser, navigate to `localhost:5000`

### Support ###

* Currently tested on Ubuntu 14.04, using Chrome.
