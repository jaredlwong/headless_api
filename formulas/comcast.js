// 8-16 characters
// Include at least one letter and include numbers or special characters like !”#$%&’()*+,-./:;<=>?@[\]^_`{|}~
// Must not contain your first name, last name, User ID or Username
// Do not include spaces

function login(username, password, success_obj) {
	casper.thenOpen('http://my.xfinity.com/oauth/login');

	casper.fillMagically("#signin-box form", {
		"user": username,
		"passwd": password,
	}, function _success_failure() {
		return {
			success: /my\.xfinity\.com\/$/.test(location.href),
			failure: document.body.innerHTML.indexOf("The username and password entered do not match. Please try again.") > -1,
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

	casper.thenOpen('https://customer.xfinity.com/Secure/UserSettings/Flows/ChangePassword');

	casper.then(function() {
		this.fillNames("#mainform", {
			"main_0$currentPassword": old_password,
			"main_0$newPassword": new_password,
			"main_0$confirmPassword": new_password,
		}, false);
	});

//	casper.thenEvaluate(function() {
//		__utils__.setField(__utils__.findOne("#main_0_currentPassword"), old_password);
//		__utils__.setField(__utils__.findOne("#main_0_newPassword"), new_password);
//		__utils__.setField(__utils__.findOne("#main_0_confirmPassword"), new_password);
//	});

	casper.thenClick("#main_0_btnConfirm");

	casper.waitForText("Edit personal information",
		function _then() {
			success.value = true;
		}, function _on_timeout() {
			success.value = false;
		});

	casper.wait(4000);
	casper.then(function() {
		this.capture('comcast.png');
	});
};
exports.reset = reset;
