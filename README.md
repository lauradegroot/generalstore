# General Store

## What it is

A 2D adventure game maker.

## Setup instructions

Install [node](http://nodejs.org)

> npm install

## Setting up nunjucks

This will allow you to compile your templates for production

To read more about nunjucks, check out the [documentation](http://nunjucks.jlongster.com)

Download nunjucks and add it to generalstore/media/js/lib/nunjucks.js

If you are on development mode, use [nunjucks-dev.js](https://github.com/jlongster/nunjucks/blob/master/browser/nunjucks-dev.js)

If you are on production and have precompiled your templates, use [nunjucks.js](https://github.com/jlongster/nunjucks/blob/master/browser/nunjucks.js)

## Precompiling templates for nunjucks

In development mode, make sure generalstore/media/js/templates.js only has the following:

    define(function() {});

In production mode, run the following:

    node_modules/nunjucks/bin/precompile generalstore/templates > generalstore/media/js/templates.js

## Minifying files with Grunt

> node_modules/grunt-cli/bin/grunt

## Configure settings

If you need to override generalstore/media/js/settings.js, create generalstore/media/js/local_settings.js and return the new values. For example:

    define([],
      function () {

      'use strict';

      return {
        DEBUG: true
      };
    });

## Running tests

Load `generalstore/test/tests.html` in a browser
