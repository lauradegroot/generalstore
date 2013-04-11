define([],
  function () {
  'use strict';

  /**
   * Create an item.
   * @constructor
   */
  var Item = function () {
    this.items = [];
  };

  /**
   * Loads item properties
   * @param {number} level Item level
   * @param {object} items All items
   */
  Item.prototype.load = function (level, items) {
    for (var i = 0; i < items.length; i ++) {
      try {
        items[i].id = level + '-' + items[i].name;
        this.items.push(items[i]);
      } catch (err) {
        throw new Error(err);
      }
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
