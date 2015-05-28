var PWDRESET_github = {

login_page: 'https://github.com/login',

login_form_select_func: function() {
	return document.querySelector("form[action='/session']");
},

login_form_username_select_func: function(form) {
	return form.elements["login"];
},

login_form_password_select_func: function(form) {
	return form.elements["password"];
},

login_form_success_func: function() {
	return /github\.com\/$/.test(location.href);
},

login_form_failure_func: function() {
	return /github\.com\/session$/.test(location.href);
},

reset_page: 'https://github.com/settings/admin',

reset_form_select_func: function() {
	return document.querySelector("#change_password");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["user[old_password]"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["user[password]"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["user[password_confirmation]"];
},

reset_form_success_func: function() {
	return document.body.innerHTML.indexOf("Password changed successfully.") > -1;
},

reset_form_failure_func: function() {
	return false;
}

};
