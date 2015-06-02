var test_helpers = require('./test_helpers');


describe('box.com', function() {
  describe('login', function() {
    it('should login to box.com',
       test_helpers.login_test('box.com'));
  });

  describe('reset password', function() {
    it('should reset password to box.com',
       test_helpers.reset_password_test('box.com'));
  });
});
