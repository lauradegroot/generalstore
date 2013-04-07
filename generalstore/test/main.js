require.config({
  baseUrl:'.'
});

require(['require', 'lib/chai', 'lib/mocha'], function (require, chai) {
  assert = chai.assert;
  should = chai.should();
  expect = chai.expect;

  mocha.setup('bdd');

  require(['test.user'], function (user) {
    mocha.run();
  });

});
