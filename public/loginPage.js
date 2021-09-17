`use strict`
const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  ApiConnector.login(data, (res) => {
    if (res.success === true) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(res.error);
    }
  });
};

userForm.registerFormCallback = function (data) {
  ApiConnector.register(data, (res) => {
    if (res.success === true) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(res.error);
    }
  });
};
