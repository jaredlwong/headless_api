var test_helpers = require('./test_helpers');


describe('github.com', function() {
  describe('login', function() {
    it('should login to github.com',
       test_helpers.login_test('github.com'));
  });

  describe('reset', function() {
    it('should reset password to github.com',
       test_helpers.reset_password_test('github.com'));
  });
});

