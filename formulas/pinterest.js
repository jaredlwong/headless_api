exports.name = 'pinterest.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.pinterest.com/login/');
  casper.waitForUrl('https://www.pinterest.com/login/');

  casper.fillMagically("form", {
    "username_or_email": username,
    "password": password,
  }, function success() {
    return /www\.pinterest\.com\//.test(location.href);
  }, null, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://www.pinterest.com/settings/');
  casper.waitForUrl('https://www.pinterest.com/settings/');

  casper.thenClick(".changePasswordButton");
  casper.waitForSelector(".UserChangePassword form");

  casper.fillMagically(".UserChangePassword form", {
    "old": old_password,
    "new": new_password,
    "new_confirm": new_password
  }, function success() {
    return document.body.innerHTML.indexOf("Your password has been changed successfully.") > -1;
  }, null, success_callback);
}
