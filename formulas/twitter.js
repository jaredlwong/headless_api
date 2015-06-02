exports.name = 'twitter.com';
exports.login = login;
exports.reset = reset;


function login(casper, username, password, success_obj) {
  var system = require('system');

  casper.thenOpen('https://twitter.com/');

  casper.fillMagically("form[action='https://twitter.com/sessions']", {
    "session[username_or_email]": username,
    "session[password]": password,
  }, function _success_failure() {
    return {
      success: /twitter\.com\/account\/login_verification/.test(location.href),
      failure: /twitter\.com\/login\/error/.test(location.href),
    };
  }, success_obj);

  casper.then(function() {
    system.stdout.writeLine("Me > Gear > Settings > Name @username > Security > Login requests");
    system.stdout.write("Hit enter when you've verified your code on your twitter app: ");
    var line = system.stdin.readLine();
  });

  casper.waitForUrl(/twitter\.com\/$/, 
    function _then() {
      success_obj.value = true;
    }, function _on_timeout() {
      success_obj.value = false;
    });
};


function reset(casper, username, old_password, new_password, success) {
  var login_success = {};
  login(username, old_password, login_success);
  casper.then(function() {
    if (!login_success.value) {
      success.value = false;
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://twitter.com/settings/password');

  casper.then(function() {
    this.fill('form#password-form', {
      'current_password': old_password,
      'user_password': new_password,
      'user_password_confirmation': new_password,
    },true);
  });

  casper.waitForUrl(/twitter\.com\/settings\/passwords\/password_reset_confirmation$/,
    function _then() {
      success.value = true;
    }, function _on_timeout() {
      success.value = false;
    });
};
