var test_helpers = require('./test_helpers');


describe('8tracks.com', function() {
  describe('login', function() {
    it('should login to 8tracks.com',
       test_helpers.login_test('8tracks.com'));
  });

  describe('reset', function() {
    it('should reset password to 8tracks.com',
       test_helpers.reset_password_test('8tracks.com'));
  });
});

