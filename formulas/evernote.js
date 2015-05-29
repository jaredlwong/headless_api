function login(username, password, success_obj) {
	casper.thenOpen('https://www.evernote.com/Login.action');

	casper.then(function() {
		this.fillNames("#login_form", {
			"username": username,
			"password": password,
		}, false);
	});

	casper.thenClick("#login");

	casper.waitForUrl(/evernote\.com\/Home\.action/,
		function _then() {
			success_obj.value = true;
		}, function _on_timeout() {
			success_obj.value = false;
		});
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

	casper.thenOpen('https://www.evernote.com/secure/SecuritySettings.action');

	casper.thenClick("#security-change-password");

	casper.fillMagically("#security-change-password-form", {
		"password": old_password,
		"newPassword": new_password,
		"confirmPassword": new_password,
	}, function _success_failure() {
		return {
			success: document.querySelector("#lightbox-frame") !== null,
			failure: false,
		};
	}, success);
};
exports.reset = reset;
