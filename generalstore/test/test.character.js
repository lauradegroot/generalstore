define(['../media/js/base/character', '../media/js/base/user'],
  function (Character, User) {
  'use strict';

  var options = {
    env: 'test'
  };

  var user = new User(options);
  var character = new Character();

  describe('Character', function () {
    afterEach(function () {
      user.reset();
    });

    it('should be load items', function (done) {
      var characters = ['cat', 'dog', 'snake'];
      character.load(1, characters);

      expect(character.characters).to.deep.equal(characters);
      expect(character.characters).to.have.length(3);
      done();
    });

    it('should set user inventory', function (done) {
      character.setInventory('cloud', user);
      expect(user.hasInventory('cloud')).to.equal(true);
      done();
    });
  });
});
