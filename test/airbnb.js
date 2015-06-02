var test_helpers = require('./test_helpers');


describe('airbnb.com', function() {
  describe('login', function() {
    it('should login to airbnb.com',
       test_helpers.login_test('airbnb.com'));
  });

  describe('reset password', function() {
    it('should reset password to airbnb.com',
       test_helpers.reset_password_test('airbnb.com'));
  });
});

