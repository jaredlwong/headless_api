exports.name = 'github.com';
exports.login = login;
exports.reset = reset;


function login(casper, username, password, success_obj) {
  casper.thenOpen('https://github.com/login');

  casper.fillMagically("form[action='/session']", {
    "login": username,
    "password": password,
  }, function _success_failure() {
    return {
      success: /github\.com\/$/.test(location.href),
      failure: /github\.com\/session$/.test(location.href),
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

  casper.thenOpen('https://github.com/settings/admin');

  casper.fillMagically("#change_password", {
    "user[old_password]": old_password,
    "user[password]": new_password,
    "user[password_confirmation]": new_password,
  }, function _success_failure() {
    return {
      success: document.body.innerHTML.indexOf("Password changed successfully.") > -1,
      failure: false,
    };
  }, success);
};
