var test_helpers = require('./test_helpers');


describe('evernote.com', function() {
  describe('login', function() {
    it('should login to evernote.com',
       test_helpers.login_test('evernote.com'));
  });

  describe('reset password', function() {
    it('should reset password to evernote.com',
       test_helpers.reset_password_test('evernote.com'));
  });
});

