exports.name = 'twitter.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  var system = require('system');

  casper.thenOpen('https://twitter.com/');
  casper.waitForUrl('https://twitter.com/');

  casper.fillMagically("form[action='https://twitter.com/sessions']", {
    "session[username_or_email]": username,
    "session[password]": password,
  }, function success() {
    return /twitter\.com\/account\/login_verification/.test(location.href);
  }, function failure() {
    return /twitter\.com\/login\/error/.test(location.href);
  }, success_callback);

  casper.then(function() {
    system.stdout.writeLine("Me > Gear > Settings > Name @username > Security > Login requests");
    system.stdout.write("Hit enter when you've verified your code on your twitter app: ");
    var line = system.stdin.readLine();
  });

  casper.waitForUrl(/twitter\.com\/$/, 
    function _then() {
      success_callback(true);
    }, function _on_timeout() {
      success_callback(false);
    });
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://twitter.com/settings/password');
  casper.waitForUrl('https://twitter.com/settings/password');

  casper.waitFor(function() {
    this.fill('form#password-form', {
      'current_password': old_password,
      'user_password': new_password,
      'user_password_confirmation': new_password,
    }, true);
    return true;
  });

  casper.waitForUrl(/twitter\.com\/settings\/passwords\/password_reset_password_confirmation$/,
    function _then() {
      success_callback(true);
    }, function _on_timeout() {
      success_callback(false);
    });
};
