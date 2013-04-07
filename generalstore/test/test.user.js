define(['../media/js/base/user'],
  function (User) {
  'use strict';

  var user = new User();

  describe('User', function () {
    afterEach(function () {
      user.reset();
    });

    it('should be initialized for a new user', function (done) {
      expect(user).to.be.a('object');
      expect(user.level).to.equal(1);
      expect(user.inventory).to.have.length(0);
      done();
    });

    it('should be initialized for a failed setting on an existing user', function (done) {
      localStorage.setItem('player', 'invalidjson');
      user = new User();
      expect(user).to.be.a('object');
      expect(user.level).to.equal(1);
      expect(user.inventory).to.have.length(0);
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
  });
});
