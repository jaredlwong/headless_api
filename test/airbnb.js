var test_runner = require('./test_runner');


describe('airbnb.com', function() {
  describe('login', function() {
    it('should login to airbnb.com',
       test_runner.login_test('airbnb.com'));
  });

  describe('reset password', function() {
    it('should reset password to airbnb.com',
       test_runner.reset_password_test('airbnb.com'));
  });
});

