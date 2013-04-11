define([],
  function () {
  'use strict';

  /**
   * Create a character
   * @constructor
   */
  var Character = function () {
    this.all;
    this.current = null;
  };

  /**
   * Set the active character
   */
  Character.prototype.active = function (id) {

    if (this.all[id]) {
      this.current = this.all[id];
    } else {
      throw new Error('Could not load character by id.');
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
