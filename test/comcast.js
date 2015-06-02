var test_runner = require('./test_runner');


describe('comcast.net', function() {
  describe('login', function() {
    it('should login to comcast.net',
       test_runner.login_test('comcast.net'));
  });

  describe('reset password', function() {
    it('should reset password to comcast.net',
       test_runner.reset_password_test('comcast.net'));
  });
});
