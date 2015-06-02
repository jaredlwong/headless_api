exports.name = 'yelp.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://www.yelp.com/login');
  casper.waitForUrl('https://www.yelp.com/login');

  casper.fillMagically("#login-form", {
    "email": username,
    "password": password,
  }, function success() {
    return document.body.innerHTML.indexOf("Log Out") > -1;
  }, null, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://www.yelp.com/profile_password');
  casper.waitForUrl('https://www.yelp.com/profile_password');

  casper.fillMagically("#profile-password-form", {
    "old_password": old_password,
    "password": new_password,
    "confirm_password": new_password,
  }, function success() {
    return document.body.innerHTML.indexOf("Your password has been changed.") > -1;
  }, null, success_callback);
};
