function login(username, password, success_obj) {
	casper.thenOpen('https://app.box.com/');

	casper.fillMagically("#login_form", {
		"login": username,
		"password": password,
	}, function _success_failure() {
		return {
			success: /app\.box\.com\/files$/.test(location.href),
			failure: /app\.box\.com\/login$/.test(location.href),
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

	casper.thenOpen('https://app.box.com/settings/account');

	casper.fillMagically("#settings_user_password_form", {
		"settings_old_password": old_password,
		"settings_new_password": new_password,
		"settings_confirm_password": new_password,
	}, function _success_failure() {
		return {
			success: document.body.innerHTML.indexOf("Your settings have been successfully updated") > -1,
			failure: false,
		};
	}, success);
};
exports.reset = reset;
