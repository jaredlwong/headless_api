var PWDRESET_box = {

login_page: 'https://app.box.com/',

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
	return /app\.box\.com\/files$/.test(location.href);
},

login_form_failure_func: function() {
	return /app\.box\.com\/login$/.test(location.href);
},

reset_page: 'https://app.box.com/settings/account',

reset_form_select_func: function() {
	return document.querySelector("#settings_user_password_form");
},

reset_form_old_password_select_func: function(form) {
	return form.elements["settings_old_password"];
},

reset_form_new_password_select_func: function(form) {
	return form.elements["settings_new_password"];
},

reset_form_confirm_new_password_select_func: function(form) {
	return form.elements["settings_confirm_password"];
},

reset_form_success_func: function() {
	return document.body.innerHTML.indexOf("Your settings have been successfully updated") > -1;
},

reset_form_failure_func: function() {
	return false;
}

};
