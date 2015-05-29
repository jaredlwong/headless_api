function login(username, password, success_obj) {
	casper.thenOpen('https://www.yelp.com/login');

	casper.fillMagically("#login-form", {
		"email": username,
		"password": password,
	}, function _success_failure() {
		return {
			success: document.body.innerHTML.indexOf("Log Out") > -1,
			failure: false,
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

	casper.thenOpen('https://www.yelp.com/profile_password');

	casper.fillMagically("#profile-password-form", {
		"old_password": old_password,
		"password": new_password,
		"confirm_password": new_password,
	}, function _success_failure() {
		return {
			success: document.body.innerHTML.indexOf("Your password has been changed.") > -1,
			failure: false,
		};
	}, success);
};
exports.reset = reset;
