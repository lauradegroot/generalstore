'use strict';

var fs = require('fs');

var FILE_PATH = 'stories';

var KEYWORDS = true;
KEYWORDS['level'] = true;
KEYWORDS['background_image'] = true;
KEYWORDS['location'] = true;
KEYWORDS['description'] = true;
KEYWORDS['character'] = true;
KEYWORDS['name:'] = true;
KEYWORDS['requires:'] = true;
KEYWORDS['first_says:'] = true;
KEYWORDS['finally_says:'] = true;
KEYWORDS['gives:'] = true;
KEYWORDS['top:'] = true;
KEYWORDS['left:'] = true;
KEYWORDS['levels_up_to:'] = true;

var processJSON = function (data, callback) {
  // Split content up by their newlines
  var content = data.split(/\n|\r/gi);
  var json = [];
  var currContent = [];
  var currProperty;
  var currSecProperty;
  var currentMatch = '';

  for (var i = 0; i < content.length; i ++) {
    var c = content[i];
    c = c.toString().trim();

    // level properties
    if (i === 0 || !content[i - 1] || content[i- 1].toString().length === 0) {
      console.log(c.toLowerCase())
      currentMatch = 'property';

      if (KEYWORDS[c.toLowerCase()]) {
        currProperty = c;
        json[currProperty] = '';
        console.log('property: ', currProperty);
      }
    }

    if (c.match(/^\w+:\s/gi)) {
      currentMatch = 'secProperty';
      var propArray = c.split(/:\s/);
      var p = propArray[0].toLowerCase();

      if (KEYWORDS[p + ':']) {
        currSecProperty = p;
        console.log('secProperty: ', currSecProperty);
        json[currProperty][currSecProperty] = propArray[1];
      }
    }

    if (currentMatch === 'property' || currentMatch === 'secProperty') {
      if (c.length > 0) {
        console.log('text: ', currContent)
        currContent.push(c);
        json[currProperty] = c;
      } else {
        currContent = [];
      }

      currentMatch = '';
    }
  }

  console.log(json)
  callback(null, data);
};

var processText = function (result, callback) {
  fs.readFile(FILE_PATH + '/' + result, 'utf8', function (err, data) {
    if (err) {
      callback(err);
    } else {
      processJSON(data, function (err, json) {
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
        if (file !== '.gitignore') {
          processText(file, function (err, f) {
            if (err) {
              callback(err);
            } else {
              result.push(f);
              if (result.length === files.length - 1) {
                callback(null, result);
              }
            }
          });
        }
      });
    }
  });
};
