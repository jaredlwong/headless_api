var require = patchRequire(require);

exports.ensure = function(username, pwd) {
	casper.echo(username);
	casper.echo(pwd);
	casper.start('https://www.airbnb.com/login');
	casper.then(function() {
		this.fill("form.login-form", {
			'email': username,
			'password': pwd,
		}, true);
	});
	casper.waitForUrl("https://www.airbnb.com/dashboard",
		function() { this.echo('true'); },
		function() { this.echo('false'); },
		4000);
};

exports.reset = function(username, old_pwd, new_pwd) {
	casper.start('https://www.airbnb.com/login');
	casper.then(function() {
		this.fill("form.login-form", {
			'email': username,
			'password': old_pwd
		}, true);
	});
	casper.waitForUrl("https://www.airbnb.com/dashboard",
		function() { this.echo('true'); },
		function() { this.echo('false'); },
		4000);
	casper.thenOpen('https://www.airbnb.com/users/security');
	casper.then(function() {
		this.evaluate(function(password_old, password_new) {
			var change_password_form = document.querySelector("form[action*=password]");
			change_password_form.elements['old_password'].value = password_old;
			change_password_form.elements['user[password]'].value = password_new;
			change_password_form.elements['user[password_confirmation]'].value = password_new;
			change_password_form.submit();
		}, old_pwd, new_pwd);
	});
	casper.wait(4000, function() {
		this.capture('airbnb.png');
	});
};
