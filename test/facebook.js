var test_helpers = require('./test_helpers');


describe('facebook.com', function() {
  describe('login', function() {
    it('should login to facebook.com',
       test_helpers.login_test('facebook.com'));
  });

  describe('reset password', function() {
    it('should reset password to facebook.com',
       test_helpers.reset_password_test('facebook.com'));
  });
});

