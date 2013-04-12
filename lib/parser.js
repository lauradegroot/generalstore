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

var defaultJSON = {
  level: false,
  location: false,
  background_image: false,
  description: false,
  characters: {},
  items: {}
};
var resultJSON = defaultJSON;
var currLevel = 0;
var currProperty;
var secProperties = {};

/**
 * Sets the properties for the level
 */
var setProperty = function (c) {
  // primary properties
  if (KEYWORDS[c] || KEYWORDS_GROUP[c]) {
    currProperty = c;

  // secondary properties
  } else if (c.match(SEC_PROPERTY)) {
    var propArray = c.split(/:\s/);

    if (!isNaN(propArray[1])) {
      propArray[1] = parseInt(propArray[1], 10);
    }

    secProperties[propArray[0]] = propArray[1];

  // level content
  } else if (c.length > 0) {
    if (currProperty === 'level') {
      currLevel = parseInt(c, 10);
    }

    if (!isNaN(c)) {
      c = parseInt(c, 10);
    }

    resultJSON[currProperty] = c;

  // line break
  } else {
    if (KEYWORDS_GROUP[currProperty]) {
      var propId = currLevel + '-' + secProperties.name;

      resultJSON[KEYWORDS_GROUP[currProperty]][propId] = secProperties;
    }

    secProperties = {};
    currProperty = null;
  }
};

/**
 * Generates the content and writes to a JSON config file
 */
var processJSON = function (data, callback) {
  // Split content up by their newlines
  var content = data.split(/\n|\r/gi);

  for (var i = 0; i < content.length; i ++) {
    var c = content[i].toString().trim();

    setProperty(c);
  }

  fs.writeFile('generalstore/config/level' + currLevel + '.json',
    JSON.stringify(resultJSON, undefined, 4), { flags: 'w' }, function (err) {
    if (err) {
      callback(err);

    } else {
      callback(null, resultJSON);
    }
  });
};

/**
 * Reads through and processes a file
 */
var processText = function (result, callback) {
  secProperties = {};
  currProperty = null;
  currLevel = currLevel + 1;
  resultJSON = defaultJSON;

  fs.readFile(FILE_PATH + '/' + result, 'utf8', function (err, data) {
    if (err) {
      callback(err);

    } else {
      processJSON(data, function (err, json) {
        console.log(json)
        if (err) {
          callback(err);
        } else {
          callback(null, json);
        }
      });
    }
  });
};

/**
 * Reads through the stories directory and generates each as a json file
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
        if (file !== '.gitignore' && file !== 'level.txt-sample') {
          processText(file, function (err, f) {
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
