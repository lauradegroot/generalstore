define([],
  function () {
  'use strict';

  /**
   * Create a character
   * @constructor
   */
  var Character = function () {
    this.characters = [];
  };

  /**
   * Loads character properties
   * @param {number} level Character level
   * @param {object} characters All characters
   */
  Character.prototype.load = function (level, characters) {
    for (var i = 0; i < characters.length; i ++) {
      try {
        characters[i].id = level + '-' + characters[i].name;
        this.characters.push(characters[i]);
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  /**
   * Set inventory for player
   * @param {string} inventory Inventory name
   * @param {object} user Current player
   */
  Character.prototype.setInventory = function (inventory, user) {
    if (!!inventory && !user.hasInventory(inventory)) {
      user.inventory.push(inventory);
      user.save();
    }
  };

  return Character;
});
