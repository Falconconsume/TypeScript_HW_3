var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CurrencyTypeEnum;
(function (CurrencyTypeEnum) {
    CurrencyTypeEnum["USD"] = "USD";
    CurrencyTypeEnum["EUR"] = "EUR";
    CurrencyTypeEnum["GBP"] = "GBP";
})(CurrencyTypeEnum || (CurrencyTypeEnum = {}));
var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.attach = function (observer) {
        var isExist = this.observers.includes(observer);
        if (isExist)
            return console.log('Observable: Observer has been attached already.');
        this.observers.push(observer);
        console.log('Observable:: Attached an observer.');
    };
    Observable.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1)
            return console.log('Observable: Nonexistent observer.');
        this.observers.splice(observerIndex, 1);
        console.log('Observable: Detached an observer.');
    };
    Observable.prototype.notify = function () {
        console.log('Observable: Notifying observer...');
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    return Observable;
}());
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter() {
    }
    // Implement the currency conversion logic
    CurrencyConverter.prototype.convert = function (amount, targetCurrency) {
        // Implement the conversion logic based on exchange rates or any other mechanism
        // For simplicity, let's assume a 1:1 conversion rate for now
        return amount;
    };
    return CurrencyConverter;
}());
var Bank = /** @class */ (function () {
    function Bank() {
        this.accounts = [];
        this.observers = [];
    }
    Bank.getInstance = function () {
        if (!Bank.instance) {
            Bank.instance = new Bank();
        }
        return Bank.instance;
    };
    Bank.prototype.createAccount = function (client, currency) {
        var conversionStrategy = new CurrencyConverter();
        var account = new BankAccount(client, currency, conversionStrategy);
        this.accounts.push(account);
        return account;
    };
    Bank.prototype.closeAccount = function (account) {
        var index = this.accounts.indexOf(account);
        if (index !== -1) {
            this.accounts.splice(index, 1);
            console.log("Account ".concat(account.getAccountNumber(), " closed."));
        }
        else {
            console.log('Account not found.');
        }
    };
    Bank.prototype.attach = function (observer) {
        var isExist = this.observers.includes(observer);
        if (!isExist) {
            this.observers.push(observer);
        }
    };
    Bank.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
        }
    };
    Bank.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    return Bank;
}());
var BankAccount = /** @class */ (function (_super) {
    __extends(BankAccount, _super);
    function BankAccount(client, currency, conversionStrategy) {
        var _this = _super.call(this) || this;
        _this.balance = 1000;
        _this.currency = currency;
        _this.holderName = client;
        _this.number = 12345678;
        _this._conversionStrategy = conversionStrategy;
        return _this;
    }
    Object.defineProperty(BankAccount.prototype, "balanceInfo", {
        get: function () {
            return "".concat(this.currency).concat(this.balance);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "holderName", {
        get: function () {
            return this._holderName;
        },
        set: function (_a) {
            var firstName = _a.firstName, lastName = _a.lastName;
            if (!firstName.trim())
                throw new Error("Client first name can't be empty!");
            if (!lastName.trim())
                throw new Error("Client last name can't be empty!");
            this._holderName = "".concat(lastName, " ").concat(firstName);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "conversionStrategy", {
        set: function (strategy) {
            this._conversionStrategy = strategy;
        },
        enumerable: false,
        configurable: true
    });
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    BankAccount.prototype.withdraw = function (amount) {
        if (this.balance < amount)
            throw new Error("Sorry ".concat(this._holderName, ", you don't have enough funds!"));
        this.balance -= amount;
    };
    BankAccount.prototype.getAccountNumber = function () {
        return this.number;
    };
    BankAccount.prototype.makeTransaction = function (amount, targetCurrency) {
        var convertAmount = this._conversionStrategy.convert(amount, targetCurrency);
        this.balance -= convertAmount;
        console.log("Transaction: ".concat(amount, " ").concat(this.currency, " => ").concat(targetCurrency, ", Converted Amount: ").concat(convertAmount, " ").concat(targetCurrency, ", Balance: ").concat(this.balance, " ").concat(this.currency));
        this.notify();
    };
    return BankAccount;
}(Observable));
var SMSNotification = /** @class */ (function () {
    function SMSNotification() {
    }
    SMSNotification.prototype.update = function (account) {
        console.log("SMS notification: Your account balance has changed. Current balance ".concat(account.balanceInfo));
    };
    return SMSNotification;
}());
var EmailNotification = /** @class */ (function () {
    function EmailNotification() {
    }
    EmailNotification.prototype.update = function (account) {
        console.log("Email notification: Your account balance has changed. Current balance ".concat(account.balanceInfo));
    };
    return EmailNotification;
}());
var PushNotification = /** @class */ (function () {
    function PushNotification() {
    }
    PushNotification.prototype.update = function (account) {
        console.log("Push notification: Your account balance has changed. Current balance ".concat(account.balanceInfo));
    };
    return PushNotification;
}());
var bank = Bank.getInstance();
var client1 = { firstName: 'John', lastName: 'Doe' };
var client2 = { firstName: 'Alice', lastName: 'Smith' };
var account1 = bank.createAccount(client1, CurrencyTypeEnum.USD);
var account2 = bank.createAccount(client2, CurrencyTypeEnum.EUR);
var smsNotification = new SMSNotification();
var emailNotification = new EmailNotification();
bank.attach(smsNotification);
bank.attach(emailNotification);
account1.deposit(500);
account2.deposit(200);
bank.detach(emailNotification);
account1.withdraw(100);
account2.makeTransaction(50, CurrencyTypeEnum.GBP);
bank.closeAccount(account1);
