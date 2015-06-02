exports.name = 'comcast.net';
exports.login = login;
exports.reset_password = reset_password;
exports.length = { min: 8, max: 16 };
exports.numbers = { min: 1, max: 16 };
exports.specials = { min: 1, max: 16 };
exports.special_chars = "!\”#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"


// 8-16 characters
// Include at least one letter and include numbers or special characters like !”#$%&’()*+,-./:;<=>?@[\]^_`{|}~
// Must not contain your first name, last name, User ID or Username
// Do not include spaces

function login(casper, username, password, success_callback) {
  casper.thenOpen('http://my.xfinity.com/oauth/login');
  casper.waitForUrl('login.comcast.net/login');

  casper.fillMagically("#signin-box form", {
    "user": username,
    "passwd": password,
  }, function success() {
    return /my\.xfinity\.com\/$/.test(location.href);
  }, function failure() {
    return document.body.innerHTML.indexOf("The username and password entered do not match. Please try again.") > -1;
  }, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://customer.xfinity.com/Secure/UserSettings/Flows/ChangePassword/');
  casper.waitForUrl('https://customer.xfinity.com/Secure/UserSettings/Flows/ChangePassword/');

  casper.fillMagically("#mainform", {
      "main_0$currentPassword": old_password,
      "main_0$newPassword": new_password,
      "main_0$confirmPassword": new_password,
    }, null, null, success_callback, {
      submit: false
    });

   casper.thenClick("#main_0_btnConfirm");

   casper.waitForText("Edit personal information",
     function _then() {
       success_callback(true);
     }, function _on_timeout() {
       success_callback(false);
     });

  casper.wait(4000);
  casper.then(function() {
    this.capture('comcast.png');
  });
};
