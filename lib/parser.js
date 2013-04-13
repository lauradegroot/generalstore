'use strict';

var fs = require('fs');

var FILE_PATH = 'stories';
var KEYWORDS = {};
KEYWORDS['level'] = true;
KEYWORDS['location'] = true;
KEYWORDS['background_image'] = true;
KEYWORDS['description'] = true;

var KEYWORDS_GROUP = {};
KEYWORDS_GROUP['character'] = 'characters';
KEYWORDS_GROUP['item'] = 'items';

var SEC_PROPERTY = /^\w+:\s/gi;

/**
 * Creates the parser.
 * @constructor
 */
var Parser = function () {
  this.resultJSON = {
    level: false,
    location: false,
    background_image: false,
    description: false,
    characters: {},
    items: {}
  };
  this.currProperty;
  this.secProperties = {};
  this.currLevel = 0;
};

/**
 * Generates the content and writes to a JSON config file.
 * @param {string} data File contents
 * @param {function (err, resultJSON)} callback Returns JSON content for the
 * level.
 */
Parser.prototype.processJSON = function (data, callback) {
  var self = this;

  self.resultJSON.characters = {};
  self.resultJSON.items = {};

  var content = data.split(/\n|\r/gi);

  for (var i = 0; i < content.length; i ++) {
    var c = content[i].toString().trim();

    this.setProperty(c);
  }

  fs.writeFile('generalstore/config/level' + this.currLevel + '.json',
    JSON.stringify(this.resultJSON, undefined, 4), function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, self.resultJSON);
      self = null;
    }
  });
};

/**
 * Sets the properties for the level.
 * @param {string} c Property name within level.
 */
Parser.prototype.setProperty = function (c) {
  // primary properties
  if (KEYWORDS[c] || KEYWORDS_GROUP[c]) {
    this.currProperty = c;

  // secondary properties
  } else if (c.match(SEC_PROPERTY)) {
    var propArray = c.split(/:\s/);

    if (!isNaN(propArray[1])) {
      propArray[1] = parseInt(propArray[1], 10);
    }

    this.secProperties[propArray[0]] = propArray[1];

  // level content
  } else if (c.length > 0) {
    if (this.currProperty === 'level') {
      this.currLevel = parseInt(c, 10);
    }

    if (!isNaN(c)) {
      c = parseInt(c, 10);
    }

    this.resultJSON[this.currProperty] = c;

  // line break
  } else {
    if (KEYWORDS_GROUP[this.currProperty]) {
      var propId = this.currLevel + '-' + this.secProperties.name;

      this.resultJSON[KEYWORDS_GROUP[this.currProperty]][propId] = this.secProperties;
    }

    this.secProperties = {};
    this.currProperty = null;
  }
};

/**
 * Reads through and processes a file.
 * @param {string} result Filename for the level.
 * @param {function (err, json)} callback Returns JSON content for the
 * level.
 */
Parser.prototype.processText = function (result, callback) {
  var self = this;

  fs.readFile(FILE_PATH + '/' + result, 'utf8', function (err, data) {
    if (err) {
      callback(err);

    } else {
      self.processJSON(data, callback);
    }
  });
};

/**
 * Reads through the stories directory and generates each as a json file.
 * @param {function (err, result)} callback Returns the complete list of JSON
 * content for all files in the directory.
 */
exports.run = function (callback) {
  var result = [];

  fs.readdir(FILE_PATH, function (err, files) {
    if (files.length < 1) {
      return callback(new Error('No files found. Please create a story'));
    }

    if (err) {
      callback(err);

    } else {
      files.forEach(function (file) {
        var parser = new Parser();

        if (file !== '.gitignore' && file !== 'level.txt-sample') {
          parser.processText(file, function (err, f) {
            if (err) {
              callback(err);

            } else {
              result.push(f);
              if (result.length === files.length - 2) {
                callback(null, result);
              }
            }
          });
        }
      });
    }
  });
};
