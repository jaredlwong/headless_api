exports.name = 'eventbrite.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.eventbrite.com/login/');
  casper.waitForUrl('https://www.eventbrite.com/login/');

  casper.waitFor(function() {
    this.fillNames("#authentication-container form", {
      "email": username,
      "password": password,
    }, false);
    return true;
  });

  casper.thenClick("#authentication-container form input[type=submit]");

  casper.waitForUrl(/www\.eventbrite\.com\/$/,
    function _then() {
      success_callback(true);
    }, function _on_timeout() {
      success_callback(false);
    });
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://www.eventbrite.com/password');
  casper.waitForUrl('https://www.eventbrite.com/password');

  casper.fillMagically("form[action='/password']", {
    "oldpassword": old_password,
    "newpassword1": new_password,
    "newpassword2": new_password,
  }, function success() {
    return document.body.innerHTML.indexOf("Your password was changed") > -1;
  }, function failure() {
    return false;
  }, success_callback);
};
