var test_runner = require('./test_runner');


describe('amazon.com', function() {
  describe('login', function() {
    it('should login to amazon.com',
       test_runner.login_test('amazon.com'));
  });

  describe('reset password', function() {
    it('should reset password to amazon.com',
       test_runner.reset_password_test('amazon.com'));
  });
});

