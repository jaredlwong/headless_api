exports.name = 'news.ycombinator.com';
exports.login = login;
exports.reset_password = reset_password;


function login(casper, username, password, success_callback) {
  casper.thenOpen('https://news.ycombinator.com/login');
  casper.waitForUrl('https://news.ycombinator.com/login');

  casper.fillMagically("form[action=login]", {
    "acct": username,
    "pw": password,
  }, function success() {
    return /news\.ycombinator\.com\/$/.test(location.href);
  }, function failure() {
    return document.body.innerHTML.indexOf("Bad login") > -1;
  }, success_callback);
};


function reset_password(casper, username, old_password, new_password, success_callback) {
  login(casper, username, old_password, function login_success(success) {
    if (!success) {
      success_callback(success);
      casper.bypass(1000);
    }
  });

  casper.thenOpen('https://news.ycombinator.com/changepw');
  casper.waitForUrl('https://news.ycombinator.com/changepw');

  casper.fillMagically("form[action='/r']", {
    "oldpw": old_password,
    "pw": new_password,
  }, function success() {
    return /news\.ycombinator\.com\/news$/.test(location.href);
  }, function failure() {
    return /news\.ycombinator\.com\/x/.test(location.href);
  }, success_callback);
};
