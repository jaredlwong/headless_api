var PWDRESET_8tracks = {

login_page: 'http://8tracks.com/login',

login_form_select_func: function() {
	return document.querySelector("#login_form");
},

login_form_username_select_func: function(form) {
	return form.elements["login"];
},

login_form_password_select_func: function(form) {
	return form.elements["password"];
},

login_form_success_func: function() {
	return /8tracks\.com\/$/.test(location.href);
},

login_form_failure_func: function() {
	return /8tracks\.com\/sessions$/.test(location.href);
},

reset_page: 'https://8tracks.com/edit_password',

reset_form_select_func: function() {
	return document.querySelector("#set_password_form");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["user[password]"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["user[password]"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["user[password]"];
},

reset_form_success_func: function() {
	return document.body.innerHTML.indexOf("Your password was reset.") > -1;
},

reset_form_failure_func: function() {
	return false;
},

};
