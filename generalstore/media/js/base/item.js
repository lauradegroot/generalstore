define([],
  function () {
  'use strict';

  /**
   * Create an item.
   * @constructor
   */
  var Item = function () {
    this.all;
    this.current = null;
  };

  /**
   * Set the active item
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
   * @param {number} level Item level
   * @param {object} user Current player
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
