var require = patchRequire(require);

exports.ensure = function(username, pwd) {
	casper.start('https://www.facebook.com');
	casper.then(function() {
		this.fill("#login_form", {
			'email': username,
			'pass': pwd
		}, true);
	});
	casper.then(function() {
		var authenticated = this.evaluate(function() {
			return document.cookie.indexOf("c_user") > -1;
		});
		this.echo(authenticated);
	});
	casper.then(function() {
		this.capture('facebook.png');
	});
};

exports.reset = function(username, old_pwd, new_pwd) {
	var x = require('casper').selectXPath;

	casper.start('https://www.facebook.com');
	casper.then(function() {
		this.fill("#login_form", {
			'email': username,
			'pass': old_pwd
		}, true);
	});
	casper.thenOpen('https://www.facebook.com/settings?tab=account&section=password');
	casper.then(function() {
		this.evaluate(function(password_old, password_new) {
			document.querySelector("form[action*=password] #password_old").value = password_old;
			document.querySelector("form[action*=password] #password_old").select();
			document.querySelector("form[action*=password] #password_new").value = password_new;
			document.querySelector("form[action*=password] #password_confirm").value = password_confirm;
			// document.querySelector("form[action*=password] input[type=submit]").click();
		}, old_pwd, new_pwd);
	});
	casper.then(function() {
		this.capture('facebook.png');
	});
};
