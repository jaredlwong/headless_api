exports.name = 'evernote.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.evernote.com/Login.action');
  casper.waitForUrl('https://www.evernote.com/Login.action');

  casper.waitFor(function() {
    this.fillNames("#login_form", {
      "username": username,
      "password": password,
    }, false);
    return true;
  });

  casper.thenClick("#login");

  casper.waitForUrl(/evernote\.com\/Home\.action/,
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

  casper.thenOpen('https://www.evernote.com/secure/SecuritySettings.action');
  casper.waitForUrl('https://www.evernote.com/secure/SecuritySettings.action');

  casper.thenClick("#security-change-password");

  casper.fillMagically("#security-change-password-form", {
    "password": old_password,
    "newPassword": new_password,
    "confirmPassword": new_password,
  }, function success() {
    return document.querySelector("#lightbox-frame") !== null;
  }, null, success_callback);
};
