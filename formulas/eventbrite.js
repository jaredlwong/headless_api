function login(username, password, success_obj) {
	casper.thenOpen('https://www.eventbrite.com/login/');

	casper.then(function() {
		this.fillNames("#authentication-container form", {
			"email": username,
			"password": password,
		}, false);
	});

	casper.thenClick("#authentication-container form input[type=submit]");

	casper.waitForUrl(/www\.eventbrite\.com\/$/,
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

	casper.thenOpen('https://www.eventbrite.com/password');

	casper.fillMagically("form[action='/password']", {
		"oldpassword": old_password,
		"newpassword1": new_password,
		"newpassword2": new_password,
	}, function _success_failure() {
		return {
			success: document.body.innerHTML.indexOf("Your password was changed") > -1,
			failure: false,
		};
	}, success);
};
exports.reset = reset;
