exports.name = 'airbnb.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.airbnb.com/login');
  casper.waitForUrl('https://www.airbnb.com/login');

  casper.fillMagically("form.login-form", {
    "email": username,
    "password": password,
  }, function success() {
    return /airbnb\.com\/dashboard/.test(location.href);
  }, function failure() {
    return false;
  }, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://www.airbnb.com/users/security');
  casper.waitForUrl('https://www.airbnb.com/users/security');

  casper.fillMagically("form[action*=password]", {
    "old_password": old_password,
    "user[password]": new_password,
    "user[password_confirmation]": new_password,
  }, function success() {
    return document.querySelector(".flash-container").innerHTML.indexOf("Your password was successfully updated.") > -1;
  }, function failure() {
    return false;
  }, success_callback);
};
