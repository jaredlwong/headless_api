exports.name = 'reddit.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://reddit.com/login');
  casper.waitForUrl('reddit.com/login');

  casper.fillMagically("#login-form", {
    "user": username,
    "passwd": password,
  }, function success() {
    return /reddit\.com\/$/.test(location.href);
  }, function failure() {
    var form = document.querySelector("#login-form");
    if (form === null) {
      return false;
    }
    return form.innerHTML.indexOf("wrong password") > -1;
  }, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://www.reddit.com/prefs/update/');
  casper.waitForUrl('https://www.reddit.com/prefs/update/');

  casper.fillMagically("#pref-update-password", {
    "curpass": old_password,
    "newpass": new_password,
    "verpass": new_password,
  }, function success() {
    var form = document.querySelector("#pref-update-password");
    if (form === null) {
      return false;
    }
    return form.innerHTML.indexOf("your password has been updated") > -1;
  }, null, success_callback);
};
