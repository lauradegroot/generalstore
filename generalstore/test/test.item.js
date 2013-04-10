define(['../media/js/base/item'],
  function (Item) {
  'use strict';

  var options = {
    env: 'test'
  };

  var user = new User(options);
  var item = new Item();

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
  });
});
