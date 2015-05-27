var require = patchRequire(require);

exports.ensure = function(username, pwd) {
	casper.start('https://github.com/login');
	casper.then(function() {
		this.fill(".auth-form form", {
			'login': username,
			'password': pwd
		}, true);
	});
	casper.then(function() {
		this.echo(this.getCurrentUrl());
		this.echo(this.getCurrentUrl() === "https://github.com/");
	});
};

exports.reset = function(username, old_pwd, new_pwd) {
	casper.start('https://github.com/settings/admin');
	casper.then(function() {
		this.fill(".auth-form form", {
			'login': username,
			'password': old_pwd
		}, true);
	});
	casper.thenOpen('https://github.com/settings/admin');
	casper.then(function() {
		this.fill("#change_password", {
			'user[old_password]': old_pwd,
			'user[password]': new_pwd,
			'user[password_confirmation]': new_pwd
		}, true);
	});
};
