function login(username, password, success_obj) {
	casper.thenOpen('https://www.amazon.com/gp/sign-in.html');

	casper.fillMagically("#ap_signin_form", {
		"email": username,
		"password": password,
	}, function _success_failure() {
		return {
			success: document.cookie.indexOf("x-main") > -1,
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

	casper.thenOpen('https://www.amazon.com/ap/cnep?_encoding=UTF8&openid.assoc_handle=usflex');

	casper.thenClick('#auth-cnep-edit-password-button');

	casper.waitForUrl(/www\.amazon\.com\/ap\/cnep/);

	casper.fillMagically("form[action='https://www.amazon.com/ap/cnep']", {
		"password": old_password,
		"passwordNew": new_password,
		"passwordNewCheck": new_password,
	}, function _success_failure() {
		return {
			success: document.body.innerHTML.indexOf("Success") > -1,
			failure: document.body.innerHTML.indexOf("There was a problem") > -1,
		};
	}, success);
};
exports.reset = reset;
