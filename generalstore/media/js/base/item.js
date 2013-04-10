define([],
  function () {
  'use strict';

  var Item = function () {
    this.items = [];
  };

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
