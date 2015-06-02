var test_helpers = require('./test_helpers');


describe('angel.co', function() {
  describe('login', function() {
    it('should login to angel.co',
       test_helpers.login_test('angel.co'));
  });

  describe('reset', function() {
    it('should reset password to angel.co',
       test_helpers.reset_password_test('angel.co'));
  });
});

