define([],
  function () {
  'use strict';

  var player;
  var keyName = 'player';

  var defaults = {
    level: 1,
    items: [],
    inventory: []
  };

  var loadUser = function () {
    return JSON.parse(localStorage.getItem(keyName));
  };

  var User = function (options) {
    if (options.env) {
      keyName = keyName + '_' + options.env;
    }

    if (!localStorage.getItem(keyName)) {
      localStorage.setItem(keyName, JSON.stringify(defaults));
      player = loadUser();

    } else {
      try {
        player = loadUser();

      } catch (err) {
        console.error('Error loading configuration file! Resetting to defaults');
        localStorage.setItem(keyName, JSON.stringify(defaults));
        player = loadUser();
      }
    }

    this.level = player.level;
    this.items = player.items;
    this.inventory = player.inventory;
  };

  User.prototype.hasInventory = function (inventory) {
    return this.inventory.indexOf(inventory) > -1;
  };

  User.prototype.save = function () {
    localStorage.setItem(keyName, JSON.stringify(this));
  };

  User.prototype.reset = function () {
    localStorage.removeItem(keyName);
    this.level = defaults.level;
    this.items = defaults.items;
    this.inventory = defaults.inventory;
  };

  return User;
});
