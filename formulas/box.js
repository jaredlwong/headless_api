exports.name = 'box.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://app.box.com/');
  casper.waitForUrl('https://app.box.com/');

  casper.fillMagically("#login_form", {
    "login": username,
    "password": password,
  }, function success() {
    return /app\.box\.com\/files$/.test(location.href);
  }, function failure() {
    return /app\.box\.com\/login$/.test(location.href);
  }, success_callback);
};


function reset_password(casper, username, old_password, new_password, success) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://app.box.com/settings/account');
  casper.waitForUrl('https://app.box.com/settings/account');

  casper.fillMagically("#settings_user_password_form", {
    "settings_old_password": old_password,
    "settings_new_password": new_password,
    "settings_confirm_password": new_password,
  }, function success() {
    return document.body.innerHTML.indexOf("Your settings have been successfully updated") > -1;
  }, function failure() {
    return false;
  }, success);
};
