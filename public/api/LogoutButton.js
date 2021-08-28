
class LogoutButton {

  constructor() {
    [this.logoutBtn] = document.getElementsByClassName('logout');
    this.logoutBtn.addEventListener('click', this.logoutClick.bind(this));
  }

  logoutClick(event) {
    event.preventDefault();
    this.#action();
  }

  #action() {
    ApiConnector.logout((res) => {
      if (res.success === true) {
        location.reload();
      }
    });
  }
}
