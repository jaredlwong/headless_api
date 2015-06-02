exports.name = 'angel.co';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://angel.co/login');
  casper.waitForUrl('https://angel.co/login');

  casper.fillMagically("#new_user", {
    "user[email]": username,
    "user[password]": password,
  }, function success() {
    return document.body.innerHTML.indexOf("Log Out") > -1;
  }, null, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://angel.co/settings/password');
  casper.waitForUrl('https://angel.co/settings/password');

  casper.fillMagically("form[action='/settings/password']", {
    "user[current_password]": old_password,
    "user[password]": new_password,
    "user[password_confirmation]": new_password
  }, function success() {
    return document.body.innerHTML.indexOf("Password changed. Please re-authenticate with your new password.") > -1;
  }, null, success_callback);
}
