const logountButton = new LogoutButton();
const board = new RatesBoard();
const moneyManager = new MoneyManager();

getStocks(board);

ApiConnector.current((res) => {
  if (res.success === true) {
    workWithUser(res.data);
  }
});

function getStocks(board) {
  const ApiConnectorGetStocks = () => {
    ApiConnector.getStocks((res) => {
      if (res.success === true) {
        fillTableRates(res.data, board);
      }
    });
  };

  ApiConnectorGetStocks();

  setInterval(() => {
    ApiConnectorGetStocks();
  }, 1000 * 60);
}

function workWithUser(data) {
  ProfileWidget.showProfile(data);
}

function fillTableRates(data, board) {
  board.clearTable();
  board.fillTable(data);
}

moneyManager.addMoneyCallback = ({ currency, amount }) => {
  ApiConnector.addMoney({ currency, amount }, (res) => {
    if (res.success === true) {
      ProfileWidget.showProfile(res.data);
      moneyManager.setMessage(true, "Удачное пополнение баланса");
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};

moneyManager.conversionMoneyCallback = ({
  fromCurrency,
  targetCurrency,
  fromAmount,
}) => {
  ApiConnector.convertMoney(
    { fromCurrency, targetCurrency, fromAmount },
    (res) => {
      if (res.success === true) {
        ProfileWidget.showProfile(res.data);
        moneyManager.setMessage(true, "Удачное конвертирование валюты");
      } else {
        moneyManager.setMessage(false, res.error);
      }
    }
  );
};

moneyManager.sendMoneyCallback = ({ to, amount, currency }) => {
  ApiConnector.transferMoney({ to, amount, currency }, (res) => {
    if (res.success === true) {
      ProfileWidget.showProfile(res.data);
      moneyManager.setMessage(true, "Вы удачное перевели деньги");
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((res) => {
  if (res.success === true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(res.data);
    moneyManager.updateUsersList(res.data);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (res) => {
    if (res.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(res.data);
      moneyManager.updateUsersList(res.data);
      moneyManager.setMessage(
        true,
        `Пользователь id: ${data.id} name: ${data.name} добавлен в адресную книгу`
      );
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};

favoritesWidget.removeUserCallback = function (userId) {
  ApiConnector.removeUserFromFavorites(userId, (res) => {
    if (res.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(res.data);
      moneyManager.updateUsersList(res.data);
      moneyManager.setMessage(
        true,
        `Пользователь id: ${userId} удалён из адресной книги`
      );
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};
