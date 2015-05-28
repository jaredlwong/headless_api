var PWDRESET_airbnb = {

login_page: 'https://www.airbnb.com/login',

login_form_select_func: function() {
	return document.querySelector("form.login-form");
},

login_form_username_select_func: function(form) {
	return form.elements["email"];
},

login_form_password_select_func: function(form) {
	return form.elements["password"];
},

login_form_success_func: function() {
	return /airbnb\.com\/dashboard$/.test(location.href);
},

login_form_failure_func: function() {
	return false;
},

reset_page: 'https://www.airbnb.com/users/security',

reset_form_select_func: function() {
	return document.querySelector("form[action*=password]");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["old_password"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["user[password]"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["user[password_confirmation]"];
},

reset_form_success_func: function() {
	return document.querySelector(".flash-container").innerHTML.indexOf("Your password was successfully updated.") > -1;
},

reset_form_failure_func: function() {
	return false;
}

};
