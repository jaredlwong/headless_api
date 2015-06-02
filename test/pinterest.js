var test_helpers = require('./test_helpers');


describe('pinterest.com', function() {
  describe('login', function() {
    it('should login to pinterest.com',
       test_helpers.login_test('pinterest.com'));
  });

  describe('reset', function() {
    it('should reset password to pinterest.com',
       test_helpers.reset_password_test('pinterest.com'));
  });
});

