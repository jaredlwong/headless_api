var require = patchRequire(require);

exports.ensure = function(username, pwd) {
	casper.start('https://reddit.com/login');
	casper.then(function() {
		this.fill("#login-form", {
			'user': username,
			'passwd': pwd
		}, true);
	});
	casper.waitForUrl(/reddit\.com\/$/,
		function() { this.echo('true'); },
		function() { this.echo('false'); },
		4000);
};

exports.reset = function(username, old_pwd, new_pwd) {
	casper.start('https://reddit.com/login');
	casper.then(function() {
		this.fill("#login-form", {
			'user': username,
			'passwd': old_pwd
		}, true);
	});
	casper.waitForUrl(/reddit\.com\/$/,
		function() { this.echo('true'); },
		function() { this.echo('false'); },
		4000);
	casper.thenOpen('https://www.reddit.com/prefs/update/');
	casper.then(function() {
		this.evaluate(function(password_old, password_new) {
			// http://stackoverflow.com/questions/645555/should-jquerys-form-submit-not-trigger-onsubmit-within-the-form-tag
			function submitForm(form) {
				//get the form element's document to create the input control with
				//(this way will work across windows in IE8)
				var button = form.ownerDocument.createElement('input');
				//make sure it can't be seen/disrupts layout (even momentarily)
				button.style.display = 'none';
				//make it such that it will invoke submit if clicked
				button.type = 'submit';
				//append it and click it
				form.appendChild(button).click();
				//if it was prevented, make sure we don't get a build up of buttons
				form.removeChild(button);
			}
			var change_password_form = document.querySelector("#pref-update-password");
			change_password_form.elements["curpass"].value = password_old;
			change_password_form.elements["newpass"].value = password_new;
			change_password_form.elements["verpass"].value = password_new;
			submitForm(change_password_form);
		}, old_pwd, new_pwd);
	});
	casper.waitForText("your password has been updated", function() {
		this.echo("passed");
		this.capture('reddit-xxx.png');
	}, function() {
		this.echo("failed");
		this.capture('reddit-xxx.png');
	}, 4000);
};
