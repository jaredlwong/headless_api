var require = patchRequire(require);

var casper_module = require('casper');

casper_module.Casper.prototype.waitForSuccessFailure = function(success_failure_func, success_obj) {
	success_obj.value = false;
	casper.waitFor(function() {
		if (this.evaluate(function() { typeof document === 'undefined' })) {
			return false;
		}
		var success_failure = this.evaluate(success_failure_func);
		if (success_failure.success) {
			success_obj.value = true;
			return true;  // ready
		} else if (success_failure.failure) {
			return true;  // ready
		} else {
			return false;  // not ready
		}
	});
};

// selectorType
casper_module.Casper.prototype.fillMagically = function(selector, vals, success_failure_func, success_obj, selectorType) {
	// selectorType:
	//   names -> form.querySelector([name=val])
	//   css   -> form.querySelector(val)
	//   xpath -> ...
	//   label -> ...
	this.then(function() {
		// don't let it submit it, use querySelector for finding form
		this.fillForm(selector, vals, {
			selectorType: selectorType || 'names',
			submit: false,
		});
	}, selector, vals);

	this.thenEvaluate(function _evaluate(selector) {
		var form = __utils__.findOne(selector);
		var method = (form.getAttribute('method') || "GET").toUpperCase();
		var action = form.getAttribute('action') || "unknown";
		__utils__.log('submitting form to ' + action + ', HTTP ' + method, 'info');

		// http://stackoverflow.com/questions/645555/should-jquerys-form-submit-not-trigger-onsubmit-within-the-form-tag
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

//		var event = document.createEvent('Event');
//		event.initEvent('submit', true, true);
//		if (!form.dispatchEvent(event)) {
//		    __utils__.log('unable to submit form', 'warning');
//		    return;
//		}
//		if (typeof form.submit === "function") {
//		    form.submit();
//		} else {
//			// http://www.spiration.co.uk/post/1232/Submit-is-not-a-function
//			form.submit.click();
//		}
	}, selector);

	this.waitForSuccessFailure(success_failure_func, success_obj);
};
