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

  /**
   * Load the user's settings from localStorage
   */
  var loadUser = function () {
    return JSON.parse(localStorage.getItem(keyName));
  };

  /**
   * Create a player. If the player already has a valid settings file,
   * then that will be used. If the file does not exist or is invalid, their
   * settings are reset to the defaults.
   * @name User
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
   * @name User#hasInventory
   * @function
   * @param {string} inventory Inventory name
   * @returns {boolean}
   */
  User.prototype.hasInventory = function (inventory) {
    return this.inventory.indexOf(inventory) > -1;
  };

  /**
   * Checks the player's inventory history for the entire gameplay.
   * @name User#hasCollection
   * @function
   * @param {string} inventory Inventory name
   * @returns {boolean}
   */
  User.prototype.hasCollection = function (inventory) {
    return this.collection.indexOf(inventory) > -1;
  };

   /**
   * Give inventory to character or item
   * @name User#giveRequirement
   * @function
   * @param {object} obj Current character or item
   */
  User.prototype.giveRequirement = function (obj) {
    var requirement = obj.requires;

    if (this.hasInventory(requirement)) {
      this.inventory.splice(this.inventory.indexOf(requirement), 1);
      this.save();
    }
  };

  /**
   * Saves user's current game stats.
   * @name User#save
   * @function
   */
  User.prototype.save = function () {
    localStorage.setItem(keyName, JSON.stringify(this));
  };

  /**
   * Reset user's game stats.
   * @name User#reset
   * @function
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
