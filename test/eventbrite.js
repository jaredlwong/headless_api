var test_helpers = require('./test_helpers');


describe('eventbrite.com', function() {
  describe('login', function() {
    it('should login to eventbrite.com',
       test_helpers.login_test('eventbrite.com'));
  });

  describe('reset password', function() {
    it('should reset password to eventbrite.com',
       test_helpers.reset_password_test('eventbrite.com'));
  });
});

