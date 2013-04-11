'use strict';

var fs = require('fs');

var FILE_PATH = 'stories';

var processJSON = function (data, callback) {
  // Split content up by their newlines
  var content = data.split(/\n|\r/gi);
  var json = {};
  var currContent = [];
  var currProperty;
  var currSecProperty;
  var currentMatch = '';

  for (var i = 0; i < content.length; i ++) {
    var c = content[i];
    c = c.toString().trim();

    // level properties
    if (i === 0 || !content[i - 1] || content[i- 1].toString().length === 0 || c.match(/^\w+:\s/gi)) {
      if (!json[currProperty] && currProperty) {
        json[currProperty] = {};
      }

      if (c.match(/^\w+:\s/gi)) {
        var propArray = c.split(/:\s/);

        json[currProperty][propArray[0]] = propArray[1];

      } else {
        currProperty = c;
      }

    // level content
    } else if (c.length > 0) {
      if (c.length > 0) {
        json[currProperty] = c;
      } else {
        currProperty = '';
      }
    }
  }

  // Write to file
  fs.writeFile('generalstore/config/level' + parseInt(json.level, 10) + '.json', JSON.stringify(json), function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, json);
    }
  });
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
