var PWDRESET_hackernews = {

login_page: 'https://news.ycombinator.com/login',

login_form_select_func: function() {
	return document.querySelector("form[action=login]");
},

login_form_username_select_func: function(form) {
	return form.elements["acct"];
},

login_form_password_select_func: function(form) {
	return form.elements["pw"];
},

login_form_success_func: function() {
	return /news\.ycombinator\.com\/$/.test(location.href);
},

login_form_failure_func: function() {
	return document.body.innerHTML.indexOf("Bad login") > -1;
},

reset_page: 'https://news.ycombinator.com/changepw',

reset_form_select_func: function() {
	return document.querySelector("form[action='/r']");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["oldpw"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["pw"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["pw"];
},

reset_form_success_func: function() {
	return /news\.ycombinator\.com\/news$/.test(location.href);
},

reset_form_failure_func: function() {
	return /news\.ycombinator\.com\/x/.test(location.href);
}

};
