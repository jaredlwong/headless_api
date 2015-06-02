var test_runner = require('./test_runner');


describe('eventbrite.com', function() {
  describe('login', function() {
    it('should login to eventbrite.com',
       test_runner.login_test('eventbrite.com'));
  });

  describe('reset password', function() {
    it('should reset password to eventbrite.com',
       test_runner.reset_password_test('eventbrite.com'));
  });
});

