var test_runner = require('./test_runner');


describe('8tracks.com', function() {
  describe('login', function() {
    it('should login to 8tracks.com',
       test_runner.login_test('8tracks.com'));
  });

  describe('reset', function() {
    it('should reset password to 8tracks.com',
       test_runner.reset_password_test('8tracks.com'));
  });
});

