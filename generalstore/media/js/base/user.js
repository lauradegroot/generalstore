define([],
  function () {
  'use strict';

  var player;

  var defaults = {
    level: 1,
    items: [],
    inventory: []
  };

  var loadUser = function () {
    return JSON.parse(localStorage.getItem('player'));
  };

  var User = function () {
    var player;

    if (!localStorage.getItem('player')) {
      localStorage.setItem('player', JSON.stringify(defaults));
      player = loadUser();

    } else {
      try {
        player = loadUser();

      } catch (err) {
        console.error('Error loading configuration file! Resetting to defaults');
        localStorage.setItem('player', JSON.stringify(defaults));
        player = loadUser();
      }
    }

    this.level = player.level;
    this.items = player.items;
    this.inventory = player.inventory;
  };

  User.prototype.save = function () {
    localStorage.setItem('player', JSON.stringify(this));
  };

  User.prototype.reset = function () {
    localStorage.removeItem('player');
    this.level = defaults.level;
    this.items = defaults.items;
    this.inventory = defaults.inventory;
  };

  return User;
});
