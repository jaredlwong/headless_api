var test_helpers = require('./test_helpers');


describe('comcast.net', function() {
  describe('login', function() {
    it('should login to comcast.net',
       test_helpers.login_test('comcast.net'));
  });

  describe('reset password', function() {
    it('should reset password to comcast.net',
       test_helpers.reset_password_test('comcast.net'));
  });
});
