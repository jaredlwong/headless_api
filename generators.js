exports.ensure_generator = function(module) {
	return function(username, password) {
		casper.waitFor(function() {
			return this.evaluate(function(module) {
				return typeof this[module] !== 'undefined';
			}, module);
		}, function then() {
			this.evaluate(function(module) {
				location.replace(this[module].login_page);
			}, module);
		});
		casper.waitFor(function() {
			return this.evaluate(function(module) {
				return typeof this[module] !== 'undefined';
			}, module);
		}, function then() {
			this.evaluate(function(module, username, password) {
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
				var change_password_form = this[module].login_form_select_func();
				this[module].login_form_username_select_func(change_password_form).value = username;
				this[module].login_form_password_select_func(change_password_form).value = password;
				submitForm(change_password_form);
			}, module, username, password);
		});
		// changes pages while waiting
		casper.waitFor(function() {
			var success_failure = this.evaluate(function(module) {
				if (typeof this[module] !== 'undefined' &&
				    typeof this[module].login_form_success_func !== 'undefined' &&
				    typeof this[module].login_form_failure_func !== 'undefined') {
					return {
						success: this[module].login_form_success_func(),
						failure: this[module].login_form_failure_func()
					};
				} else {
					return {success: false, failure: false};
				}
			}, module);
			if (success_failure.success) {
				this.echo('true');
				return true;  // ready
			} else if (success_failure.failure) {
				this.echo('false');
				return true;  // ready
			} else {
				return false;  // not ready
			}
		}, function then() {},
		function timeout() {
			this.echo('false');
		}, 4000);
	};
};


exports.reset_generator = function(module) {
	var ensure_func = exports.ensure_generator(module);
	return function(username, old_password, new_password) {
		ensure_func(username, old_password);
		casper.waitFor(function() {
			return this.evaluate(function(module) {
				return typeof this[module] !== 'undefined';
			}, module);
		}, function then() {
			this.evaluate(function(module) {
				location.replace(this[module].reset_page);
			}, module);
		});
		casper.waitFor(function() {
			return this.evaluate(function(module) {
				return typeof this[module] !== 'undefined';
			}, module);
		}, function then() {
			this.evaluate(function(module, old_password, new_password) {
				// http://stackoverflow.com/questions/645555/should-jquerys-form-submit-not-trigger-onsubmit-within-the-form-tag
				function submitForm(form) {
					//get the form element's document to create the input control with
					//(this way will work across windows in IE8)
					var button = form.ownerDocument.createElement('button');
					//make sure it can't be seen/disrupts layout (even momentarily)
					button.style.display = 'none';
					//make it such that it will invoke submit if clicked
					button.type = 'submit';
					//append it and click it
					form.appendChild(button).click();
					//if it was prevented, make sure we don't get a build up of buttons
					form.removeChild(button);
				}
				var reset_password_form = this[module].reset_form_select_func();
				this[module].reset_form_old_password_select_func(reset_password_form).value = old_password;
				this[module].reset_form_new_password_select_func(reset_password_form).value = new_password;
				this[module].reset_form_confirm_new_password_select_func(reset_password_form).value = new_password;
				submitForm(reset_password_form);
			}, module, old_password, new_password);
		});
		// changes pages while waiting
		casper.waitFor(function() {
			var success_failure = this.evaluate(function(module) {
				if (typeof this[module] !== 'undefined' &&
				    typeof this[module].reset_form_success_func !== 'undefined' &&
				    typeof this[module].reset_form_failure_func !== 'undefined') {
					return {
						success: this[module].reset_form_success_func(),
						failure: this[module].reset_form_failure_func()
					};
				} else {
					return {success: false, failure: false};
				}
			}, module);
			if (success_failure.success) {
				this.echo('true');
				return true;  // ready
			} else if (success_failure.failure) {
				this.echo('false');
				return true;  // ready
			} else {
				return false;  // not ready
			}
		}, function then() {},
		function timeout() {
			this.echo('false');
		}, 20000);
	};
};
