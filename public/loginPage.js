`use strict`
const userForm = new UserForm();

function login(data) {
  ApiConnector.login({...data}, (res) => {
    if (res.success === true) {
      location.reload();
    }
  });
}

userForm.loginFormCallback = login;

