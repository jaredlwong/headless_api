exports.name  = '8tracks.com';
exports.login = login;
exports.reset_password = reset_password;
exports.length = 30;


function login(casper, username, password, success_callback) {
  casper.thenOpen('http://8tracks.com/login');
  casper.waitForUrl('http://8tracks.com/login');

  casper.fillMagically("#login_form", {
    "login": username,
    "password": password,
  }, function success() {
    return /8tracks\.com\/$/.test(location.href);
  }, function failure() {
    return /8tracks\.com\/sessions$/.test(location.href);
  }, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://8tracks.com/edit_password');
  casper.waitForUrl('https://8tracks.com/edit_password');

  casper.fillMagically("#set_password_form", {
    "user[password]": new_password,
  }, function success() {
      return document.body.innerHTML.indexOf("Your password was reset.") > -1;
  }, function failure() {
      return false;
  }, success_callback);
};
