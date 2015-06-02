var test_helpers = require('./test_helpers');


describe('yelp.com', function() {
  describe('login', function() {
    it('should login to yelp.com',
       test_helpers.login_test('yelp.com'));
  });

  describe('reset', function() {
    it('should reset password to yelp.com',
       test_helpers.reset_password_test('yelp.com'));
  });
});

