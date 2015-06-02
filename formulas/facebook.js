exports.name = 'facebook.com';
exports.login = login;
exports.reset = reset;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.facebook.com');

  casper.fillMagically("#login_form", {
    "email": username,
    "pass": password,
  }, function _success_failure() {
    return {
      success: document.cookie.indexOf("c_user") > -1,
      failure: false,
    };
  }, success_callback);
};


function reset(casper, username, old_password, new_password, success_callback) {
  var login_success = {};
  login(username, old_password, login_success);
  casper.then(function() {
    if (!login_success.value) {
      success.value = false;
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://www.facebook.com/settings?tab=account&section=password');
  casper.waitForUrl('https://www.facebook.com/settings?tab=account&section=password');

  casper.fillMagically("form[action*=password]", {
    "password_old": old_password,
    "password_new": new_password,
    "password_confirm": new_password,
  }, function _success_failure() {
    return {
      success: document.body.innerHTML.indexOf("Your Password Has Been Changed") > -1,
      failure: false,
    };
  }, success_callback);
};
