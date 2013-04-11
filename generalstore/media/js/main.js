define(['jquery', 'local_settings', 'base/user', 'base/character', 'base/item', 'utils', 'nunjucks', 'templates'],
  function ($, settings, User, Character, Item, utils, nunjucks) {
  'use strict';

  var user = new User({ env: settings.ENV });
  var character = new Character();
  var item = new Item();
  var body = $('body');
  var title = $('title');
  var currLevel = user.level || 1;
  var defaults;

  if (settings.DEBUG || !nunjucks.env) {
    // If not precompiled, create an environment with an HTTP loader
    nunjucks.env = new nunjucks.Environment(new nunjucks.HttpLoader('/templates'));
  }

  var setClickable = function (level) {
    if (level.requirement && !user.hasInventory(level.requirement)) {
      level.clickable = false;
    } else {
      level.clickable = true;
    }
    return level;
  };

  var setLevel = function () {
    var level = parseInt(currLevel, 10);
    // We always assume at least a first level for gameplay if the user has nothing stored
    $.getJSON('config/level' + level + '.json', function (d) {
      currLevel = d;

      for (var i = 0; i < currLevel; i ++) {
        setClickable(currLevel[i]);
      }

      item.all = currLevel.items;
      character.all = currLevel.characters;

      title.text(currLevel.location);

      // Load initial screen
      utils.loadTemplate('level.html', {
        level: currLevel.level,
        backgroundImage: currLevel.backgroundImage,
        description: currLevel.description,
        location: currLevel.location,
        items: item.all,
        characters: character.all,
        defaults: defaults
      });
    }).fail(function (err) {
      var error = 'No level' + level + '.json configuration file found! Resetting user data. ' +
        'Please create one in the config directory';
      user.reset();
      utils.loadTemplate('error.html', { message: error });
      throw new Error(error);
    });
  };

  // We need dimensions for our game background images
  $.getJSON('config/defaults.json', function (d) {
    defaults = d;
    setLevel();
  }).fail(function (err) {
    var error = 'No defaults.json configuration file found! Please create one in the config directory';
    utils.loadTemplate('error.html', { message: error });
    throw new Error(error);
  });

  body.on('click', function (ev) {
    var self = $(ev.target);

    switch (self.data('action')) {
      case 'debug-toggle':
        body.toggleClass('debugger');
        if (self.text() === 'Disable debugger') {
          self.text('Enable debugger');
        } else {
          self.text('Disable debugger');
        }
        break;

      case 'character':
        character.active(self[0].id);
        var requirement = character.current.requirement;
        var inventory = character.current.inventory;

        if (!requirement || (requirement && user.hasInventory(requirement))) {
          var message = character.current.message;

          if (user.hasCollection(inventory)) {
            message = character.current.endMessage;
          } else {
            character.setInventory(inventory, user);
          }

          if (message.trim().length > 0) {
            body.find('#message')
                .text(message)
                .addClass('on');
          }
        }
        break;

      case 'item':
        item.active(self[0].id);
        var requirement = item.current.requirement;

        if (!requirement || (requirement && user.hasInventory(requirement))) {
          item.setLevel(item.current.triggerLevel, user);
        }

        if (user.level !== currLevel) {
          currLevel = user.level;
          setLevel();
        }
        break;
    }
  });
});
