var test_helpers = require('./test_helpers');


describe('amazon.com', function() {
  describe('login', function() {
    it('should login to amazon.com',
       test_helpers.login_test('amazon.com'));
  });

  describe('reset password', function() {
    it('should reset password to amazon.com',
       test_helpers.reset_password_test('amazon.com'));
  });
});

