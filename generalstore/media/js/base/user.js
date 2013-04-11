define([],
  function () {
  'use strict';

  var player;
  var keyName = 'player';

  var defaults = {
    level: 1,
    items: [],
    inventory: [],
    collection: []
  };

  var loadUser = function () {
    return JSON.parse(localStorage.getItem(keyName));
  };

  /**
   * Create a player. If the player already has a valid settings file,
   * then that will be used. If the file does not exist or is invalid, their
   * settings are reset to the defaults.
   * @constructor
   */
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
    this.collection = player.collection;
  };

  /**
   * Checks the player's current inventory list
   * @param {string} inventory Inventory name
   * @returns {boolean}
   */
  User.prototype.hasInventory = function (inventory) {
    return this.inventory.indexOf(inventory) > -1;
  };

  /**
   * Checks the player's inventory history for the entire gameplay.
   * @param {string} inventory Inventory name
   * @returns {boolean}
   */
  User.prototype.hasCollection = function (inventory) {
    return this.collection.indexOf(inventory) > -1;
  };

  /**
   * Saves user's current game stats.
   */
  User.prototype.save = function () {
    localStorage.setItem(keyName, JSON.stringify(this));
  };

  /**
   * Reset user's game stats.
   */
  User.prototype.reset = function () {
    localStorage.removeItem(keyName);
    this.level = defaults.level;
    this.items = defaults.items;
    this.inventory = defaults.inventory;
    this.collection = defaults.collection;
  };

  return User;
});
