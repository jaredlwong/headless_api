exports.name = 'github.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://github.com/login');
  casper.waitForUrl('https://github.com/login');

  casper.fillMagically("form[action='/session']", {
    "login": username,
    "password": password,
  }, function success() {
    return /github\.com\/$/.test(location.href);
  }, function failure() {
    return /github\.com\/session$/.test(location.href);
  }, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://github.com/settings/admin');
  casper.waitForUrl('https://github.com/settings/admin');

  casper.fillMagically("#change_password", {
    "user[old_password]": old_password,
    "user[password]": new_password,
    "user[password_confirmation]": new_password,
  }, function success() {
     return document.body.innerHTML.indexOf("Password changed successfully.") > -1;
  }, null, success_callback);
};
