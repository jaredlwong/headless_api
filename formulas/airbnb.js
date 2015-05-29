function login(username, password, success_obj) {
	casper.thenOpen('https://www.airbnb.com/login');

	casper.fillMagically("form.login-form", {
		"email": username,
		"password": password,
	}, function _success_failure() {
		return {
			success: /airbnb\.com\/dashboard$/.test(location.href),
			failure: false,
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

	casper.thenOpen('https://www.airbnb.com/users/security');

	casper.fillMagically("form[action*=password]", {
		"old_password": old_password,
		"user[password]": new_password,
		"user[password_confirmation]": new_password,
	}, function _success_failure() {
		return {
			success: document.querySelector(".flash-container").innerHTML.indexOf("Your password was successfully updated.") > -1,
			failure: false,
		};
	}, success);
};
exports.reset = reset;
