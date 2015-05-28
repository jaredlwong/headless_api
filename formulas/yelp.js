var PWDRESET_yelp = {

login_page: 'https://www.yelp.com/login',

login_form_select_func: function() {
	return document.querySelector("#login-form");
},

login_form_username_select_func: function(form) {
	return form.elements["email"];
},

login_form_password_select_func: function(form) {
	return form.elements["password"];
},

login_form_success_func: function() {
	return document.body.innerHTML.indexOf("Log Out") > -1;
},

login_form_failure_func: function() {
	return false;
},

reset_page: 'https://www.yelp.com/profile_password',

reset_form_select_func: function() {
	return document.querySelector("#profile-password-form");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["old_password"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["password"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["confirm_password"];
},

reset_form_success_func: function() {
	return document.body.innerHTML.indexOf("Your password has been changed.") > -1;
},

reset_form_failure_func: function() {
	return false;
},

};
