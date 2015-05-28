var PWDRESET_facebook = {

login_page: 'https://www.facebook.com',

login_form_select_func: function() {
	return document.querySelector("#login_form");
},

login_form_username_select_func: function(form) {
	return form.elements["email"];
},

login_form_password_select_func: function(form) {
	return form.elements["pass"];
},

login_form_success_func: function() {
	return document.cookie.indexOf("c_user") > -1;
},

login_form_failure_func: function() {
	return false;
},

reset_page: 'https://www.facebook.com/settings?tab=account&section=password',

reset_form_select_func: function() {
	return document.querySelector("form[action*=password]");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["password_old"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["password_new"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["password_confirm"];
},

reset_form_success_func: function() {
	return document.body.innerHTML.indexOf("Your Password Has Been Changed") > -1;
},

reset_form_failure_func: function() {
	return false;
}

};
