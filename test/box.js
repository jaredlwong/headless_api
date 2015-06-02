var test_runner = require('./test_runner');


describe('box.com', function() {
  describe('login', function() {
    it('should login to box.com',
       test_runner.login_test('box.com'));
  });

  describe('reset password', function() {
    it('should reset password to box.com',
       test_runner.reset_password_test('box.com'));
  });
});
