exports.name = 'news.ycombinator.com';
exports.login = login;
exports.reset = reset;


function login(casper, username, password, success_obj) {
  casper.thenOpen('https://news.ycombinator.com/login');

  casper.fillMagically("form[action=login]", {
    "acct": username,
    "pw": password,
  }, function _success_failure() {
    return {
      success: /news\.ycombinator\.com\/$/.test(location.href),
      failure: document.body.innerHTML.indexOf("Bad login") > -1,
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

  casper.thenOpen('https://news.ycombinator.com/changepw');

  casper.fillMagically("form[action='/r']", {
    "oldpw": old_password,
    "pw": new_password,
  }, function _success_failure() {
    return {
      success: /news\.ycombinator\.com\/news$/.test(location.href),
      failure: /news\.ycombinator\.com\/x/.test(location.href),
    };
  }, success);
};
