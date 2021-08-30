const logountButton = new LogoutButton();

getStocks();

ApiConnector.current((res) => {
  if (res.success === true) {
    workWithUser(res.data);
  }
});

function getStocks() {
  const board = new RatesBoard();

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

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = ({currency, amount}) => {
  ApiConnector.addMoney({ currency, amount }, (res) => {
    if (res.success === true) {
      ProfileWidget.showProfile(res.data);
      moneyManager.setMessage(true, 'Удачное пополнение баланса');
    } else {
      moneyManager.setMessage(false, res.error);
    }
  });
};

moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
  ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, (res) => {
    if (res.success === true) {
      ProfileWidget.showProfile(res.data);
      moneyManager.setMessage(true, 'Удачное конвертирование валюты');
    } else {
      moneyManager.setMessage(false, res.error); 
    }
  });
};