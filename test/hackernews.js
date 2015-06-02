var test_helpers = require('./test_helpers');


describe('news.ycombinator.com', function() {
  describe('login', function() {
    it('should login to news.ycombinator.com',
       test_helpers.login_test('news.ycombinator.com'));
  });

  describe('reset', function() {
    it('should reset password to news.ycombinator.com',
       test_helpers.reset_password_test('news.ycombinator.com'));
  });
});

