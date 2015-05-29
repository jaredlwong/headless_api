function login(username, password, success_obj) {
	casper.thenOpen('http://8tracks.com/login');

	casper.fillMagically("#login_form", {
		"login": username,
		"password": password,
	}, function _success_failure() {
		return {
			success: /8tracks\.com\/$/.test(location.href),
			failure: /8tracks\.com\/sessions$/.test(location.href),
		};
	}, success_obj);
};
exports.login = login;


function reset(username, old_password, new_password, success) {
	var login_success = {};
	login(username, old_password, login_success);
	casper.then(function() {
		if (!login_success.value) {
			success.value = false;
			casper.bypass(1000);
		}
	});

	casper.thenOpen('https://8tracks.com/edit_password');

	casper.fillMagically("#set_password_form", {
		"user[password]": old_password,
	}, function _success_failure() {
		return {
			success: document.body.innerHTML.indexOf("Your password was reset.") > -1,
			failure: false,
		};
	}, success);
};
exports.reset = reset;
