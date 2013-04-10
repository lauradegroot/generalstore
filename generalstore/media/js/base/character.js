define([],
  function () {
  'use strict';

  var Character = function () {
    this.characters = [];
  };

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

  Character.prototype.setInventory = function (inventory, user) {
    if (!!inventory && !user.hasInventory(inventory)) {
      user.inventory.push(inventory);
      user.save();
    }
  };

  return Character;
});
