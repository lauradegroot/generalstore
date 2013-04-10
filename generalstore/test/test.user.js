define(['../media/js/base/user'],
  function (User) {
  'use strict';

  var options = {
    env: 'test'
  };

  var user = new User(options);

  describe('User', function () {
    afterEach(function () {
      user.reset();
    });

    it('should be initialized for a new user', function (done) {
      expect(user).to.be.a('object');
      expect(user.level).to.equal(1);
      expect(user.inventory).to.have.length(0);
      expect(user.items).to.have.length(0);
      done();
    });

    it('should be initialized for a failed setting on an existing user', function (done) {
      localStorage.setItem('player_test', '{invalidjson');
      user = new User(options);
      expect(user).to.be.a('object');
      expect(user.level).to.equal(1);
      expect(user.inventory).to.have.length(0);
      expect(user.items).to.have.length(0);
      done();
    });

    it('should be save for an existing user', function (done) {
      user.level = 2;
      user.inventory.push('test-item');
      user.save();
      expect(user).to.be.a('object');
      expect(user.level).to.equal(2);
      expect(user.inventory).to.have.length(1);
      expect(user.inventory).to.deep.equal(['test-item']);
      done();
    });

    it('should have inventory item', function (done) {
      user.inventory.push('chair');
      user.save();
      expect(user.hasInventory('chair')).to.equal(true);
      done();
    });

    it('should not have inventory item', function (done) {
      expect(user.hasInventory('table')).to.equal(false);
      done();
    });
  });
});
