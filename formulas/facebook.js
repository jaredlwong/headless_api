exports.name = 'facebook.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.facebook.com');
  casper.waitForUrl('https://www.facebook.com');

  casper.fillMagically("#login_form", {
    "email": username,
    "pass": password,
  }, function success() {
    return document.cookie.indexOf("c_user") > -1;
  }, null, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://www.facebook.com/settings?tab=account&section=password');
  casper.waitForUrl('https://www.facebook.com/settings?tab=account&section=password');

  casper.fillMagically("form[action*=password]", {
    "password_old": old_password,
    "password_new": new_password,
    "password_confirm": new_password,
  }, function success() {
    return /\/ajax\/settings\/account\/password\.php/.test(location.href);
  }, null, success_callback);
};
