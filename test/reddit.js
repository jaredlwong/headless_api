var test_helpers = require('./test_helpers');


describe('reddit.com', function() {
  describe('login', function() {
    it('should login to reddit.com',
       test_helpers.login_test('reddit.com'));
  });

  describe('reset', function() {
    it('should reset password to reddit.com',
       test_helpers.reset_password_test('reddit.com'));
  });
});

