exports.name  = 'amazon.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.amazon.com/gp/sign-in.html');
  casper.waitForUrl('https://www.amazon.com/gp/sign-in.html');

  casper.fillMagically("#ap_signin_form", {
    "email": username,
    "password": password,
  }, function success() {
    return document.cookie.indexOf("x-main") > -1;
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

  casper.thenOpen('https://www.amazon.com/ap/cnep?_encoding=UTF8&openid.assoc_handle=usflex');
  casper.waitForUrl('https://www.amazon.com/ap/cnep?_encoding=UTF8&openid.assoc_handle=usflex');

  casper.thenClick('#auth-cnep-edit-password-button');
  casper.waitForUrl('www.amazon.com/ap/cnep');

  casper.fillMagically("form[action='https://www.amazon.com/ap/cnep']", {
    "password": old_password,
    "passwordNew": new_password,
    "passwordNewCheck": new_password,
  }, function success() {
    return document.body.innerHTML.indexOf("Success") > -1;
  }, function failure() {
    return document.body.innerHTML.indexOf("There was a problem") > -1;
  }, success_callback);
};
