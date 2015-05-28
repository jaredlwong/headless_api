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
};

exports.reset = function(username, old_pwd, new_pwd) {
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
			var change_password_form = document.querySelector("form[action*=password]");
			change_password_form.elements["password_old"].value = password_old;
			change_password_form.elements["password_new"].value = password_new;
			change_password_form.elements["password_confirm"].value = password_new;
			submitForm(change_password_form);
		}, old_pwd, new_pwd);
	});
	casper.waitForText("Your Password Has Been Changed", function() {
		this.capture('facebook.png');
	}, function() {}, 4000);
};