var PWDRESET_reddit = {

login_page: 'https://reddit.com/login',

login_form_select_func: function() {
	return document.querySelector("#login-form");
},

login_form_username_select_func: function(form) {
	return form.elements["user"];
},

login_form_password_select_func: function(form) {
	return form.elements["passwd"];
},

login_form_success_func: function() {
	return /reddit\.com\/$/.test(location.href);
},

login_form_failure_func: function() {
	var form = document.querySelector("#login-form");
	if (form === null) {
		return false;
	}
	return form.innerHTML.indexOf("wrong password") > -1;
},

reset_page: 'https://www.reddit.com/prefs/update/',

reset_form_select_func: function() {
	return document.querySelector("#pref-update-password");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["curpass"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["newpass"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["verpass"];
},

reset_form_success_func: function() {
	var form = document.querySelector("#pref-update-password");
	if (form === null) {
		return false;
	}
	return form.innerHTML.indexOf("your password has been updated") > -1;
},

reset_form_failure_func: function() {
	return false;
}

};
