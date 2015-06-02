exports.name = 'reddit.com';
exports.login = login;
exports.reset = reset;


function login(casper, username, password, success_obj) {
  casper.thenOpen('https://reddit.com/login');

  casper.fillMagically("#login-form", {
    "user": username,
    "passwd": password,
  }, function _success_failure() {
    return {
      success: (function() {
        return /reddit\.com\/$/.test(location.href);
      })(),
      failure: (function() {
        var form = document.querySelector("#login-form");
        if (form === null) {
          return false;
        }
        return form.innerHTML.indexOf("wrong password") > -1;
      })(),
    };
  }, success_obj);
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

  casper.thenOpen('https://www.reddit.com/prefs/update/');

  casper.fillMagically("#pref-update-password", {
    "curpass": old_password,
    "newpass": new_password,
    "verpass": new_password,
  }, function _success_failure() {
    return {
      success: (function() {
        var form = document.querySelector("#pref-update-password");
        if (form === null) {
          return false;
        }
        return form.innerHTML.indexOf("your password has been updated") > -1;
      })(),
      failure: false,
    };
  }, success);
};
