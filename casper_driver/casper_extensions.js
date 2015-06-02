// success_callback not guaranteed to be called immediately after this step.
// Another step may preempt this step.
casper_module.Casper.prototype.waitForSuccessFailure =
    function(success_func, failure_func, success_callback) {
  failure_func = failure_func || function() { return false; };
  var success = false;
  this.waitFor(function test_func() {
    if (this.evaluate(function() { typeof document === 'undefined' })) {
      return false;
    }
    var success_failure = this.evaluate(function (s, f) {
      return {
        'success': s(),
        'failure': f(),
      };
    }, success_func, failure_func);
    if (success_failure.success) {
      // guaranteed to be set befoer wait finishes
      success = true;
      return true;  // ready
    } else if (success_failure.failure) {
      return true;  // ready
    } else {
      return false;  // not ready
    }
  }, function then() {
    success_callback(success)
  }, function on_timeout() {
    this.echo(this.getHTML());
    success_callback(success)
  });
};

// selectorType
casper_module.Casper.prototype.fillMagically =
    function(selector, vals, success_func, failure_func, success_callback,
             options) {
  options = options || {};
  if (!options.hasOwnProperty('selector_type'))
    options.selector_type = 'names';
  if (!options.hasOwnProperty('submit'))
    options.submit = true;

  // selectorType:
  //   names -> form.querySelector([name=val])
  //   css   -> form.querySelector(val)
  //   xpath -> ...
  //   label -> ...
  // this.then(function() {
  //   // don't let it submit it, use querySelector for finding form
  //   this.fillForm(selector, vals, {
  //     selectorType: options.selector_type,
  //     submit: options.submit_regular,
  //   });
  // });
  this.waitFor(function() {
    // don't let it submit it, use querySelector for finding form
    this.fillForm(selector, vals, {
      selectorType: options.selector_type,
      submit: options.submit_regular,
    });
    return true;
  });

  if (options.submit) {
    this.waitFor(function () {
      this.evaluate(function _evaluate(selector) {
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

        // var event = document.createEvent('Event');
        // event.initEvent('submit', true, true);
        // if (!form.dispatchEvent(event)) {
        //     __utils__.log('unable to submit form', 'warning');
        //     return;
        // }
        // if (typeof form.submit === "function") {
        //     form.submit();
        // } else {
        //   // http://www.spiration.co.uk/post/1232/Submit-is-not-a-function
        //   form.submit.click();
        // }
      }, selector);
      return true;
    });

    this.waitForSuccessFailure(success_func, failure_func, success_callback);
  }
};
