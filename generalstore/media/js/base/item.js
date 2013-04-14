define([],
  function () {
  'use strict';

  /**
   * Create an item.
   * @name Item
   * @constructor
   */
  var Item = function () {
    this.current = null;
  };

  /**
   * Set the active item
   * @name Item#active
   * @function
   * @param {string} id Unique id of the item
   */
  Item.prototype.active = function (id) {
    if (this.all[id]) {
      this.current = this.all[id];
    } else {
      throw new Error('Could not load item by id.');
    }
  };

  /**
   * Set the user's new level if it is higher than their current level
   * @name Item#setLevel
   * @function
   * @param {number} level Item level
   * @param {object} user Current player
   * @returns {boolean}
   */
  Item.prototype.setLevel = function (level, user) {
    if (level && user.level < level) {
      user.level = level;
      user.save();
      return true;
    }
    return false;
  };

  return Item;
});
