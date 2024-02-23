enum CurrencyTypeEnum {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

interface ICurrencyConversionStrategy {
  convert(amount: number, targetCurrency: CurrencyTypeEnum): number;
}

interface IObserver {
  update(observable: IObservable): void;
}

interface IObservable {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

interface BankClient {
  firstName: string;
  lastName: string;
}

class Observable implements IObservable {
  private readonly observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);

    if (!isExist) {
      this.observers.push(observer);
      console.log('Observable: Attached an observer.');
    } else {
      console.log('Observable: Observer has been attached already.');
    }
  }

  public detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
      console.log('Observable: Detached an observer.');
    } else {
      console.log('Observable: Nonexistent observer.');
    }
  }

  public notify(): void {
    console.log('Observable: Notifying observers...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

class CurrencyConverter implements ICurrencyConversionStrategy {
  convert(amount: number, targetCurrency: CurrencyTypeEnum): number {
    return amount;
  }
}

class Bank extends Observable {
  private static instance: Bank;
  private readonly accounts: BankAccount[] = [];

  private constructor() {
    super();
  }

  public static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  public createAccount(
    client: BankClient,
    currency: CurrencyTypeEnum,
    conversionStrategy: ICurrencyConversionStrategy
  ): BankAccount {
    const account = new BankAccount(client, currency, conversionStrategy);
    this.accounts.push(account);
    return account;
  }

  public closeAccount(account: BankAccount): void {
    const index = this.accounts.indexOf(account);
    if (index !== -1) {
      this.accounts.splice(index, 1);
      console.log(`Account ${account.getAccountNumber()} closed.`);
    } else {
      console.log('Account not found.');
    }
  }

  public makeTransaction(
    amount: number,
    targetCurrency: CurrencyTypeEnum,
    conversionStrategy: ICurrencyConversionStrategy
  ): void {
    const transaction = new CurrencyConversionTransaction(amount, targetCurrency, conversionStrategy);
    transaction.execute();
  }
}

class TransactionManager {
  private readonly transactionQueue: Transaction[] = [];

  public addToQueue(transaction: Transaction): void {
    this.transactionQueue.push(transaction);
  }

  public processQueue(): void {
    for (const transaction of this.transactionQueue) {
      transaction.execute();
    }
    this.transactionQueue.length = 0;
  }
}

abstract class Transaction {
  abstract execute(): void;
}

class CurrencyConversionTransaction extends Transaction {
  constructor(
    private readonly amount: number,
    private readonly targetCurrency: CurrencyTypeEnum,
    private readonly conversionStrategy: ICurrencyConversionStrategy
  ) {
    super();
  }

  execute(): void {
    console.log('Executing currency conversion transaction...');
  }
}

class NotificationService implements IObserver {
  update(account: BankAccount): void {
    console.log(`Notification: Your account balance has changed. Current balance ${account.balanceInfo}`);
  }
}

class BankAccount extends Observable {
  private readonly currency: CurrencyTypeEnum;
  private readonly number: number;
  private balance = 1000;
  private _holderName!: string;
  private _conversionStrategy!: ICurrencyConversionStrategy;
  private notificationService: NotificationService | null = null;

  constructor(
    client: BankClient,
    currency: CurrencyTypeEnum,
    conversionStrategy: ICurrencyConversionStrategy
  ) {
    super();
    this.currency = currency;
    this.holderName = client;
    this.number = Math.floor(Math.random() * 100000000);
    this._conversionStrategy = conversionStrategy;
  }

  public get balanceInfo(): string {
    return `${this.currency}${this.balance}`;
  }

  public get holderName(): string {
    return this._holderName;
  }

  public set holderName({ firstName, lastName }: BankClient) {
    if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
    if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

    this._holderName = `${lastName} ${firstName}`;
  }

  public set conversionStrategy(strategy: ICurrencyConversionStrategy) {
    this._conversionStrategy = strategy;
  }

  public setNotificationService(notificationService: NotificationService): void {
    this.notificationService = notificationService;
  }

  public deposit(amount: number): void {
    this.balance += amount;
    this.notify();
  }

  public withdraw(amount: number): void {
    if (this.balance < amount) {
      throw new Error(`Sorry ${this._holderName}, you don't have enough funds!`);
    }

    this.balance -= amount;
    this.notify();
  }

  public getAccountNumber(): number {
    return this.number;
  }

  public makeTransaction(
    amount: number,
    targetCurrency: CurrencyTypeEnum
  ): void {
    const convertAmount = this._conversionStrategy.convert(
      amount,
      targetCurrency
    );
    this.balance -= convertAmount;

    console.log(
      `Transaction: ${amount} ${this.currency} => ${targetCurrency}, Converted Amount: ${convertAmount} ${targetCurrency}, Balance: ${this.balance} ${this.currency}`
    );

    if (this.notificationService) {
      this.notificationService.update(this);
    }
  }
}

class SMSNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `SMS notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}

class EmailNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `Email notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}

class PushNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `Push notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}

// Використання:
const bank = Bank.getInstance();

const client1: BankClient = { firstName: 'John', lastName: 'Doe' };
const client2: BankClient = { firstName: 'Alice', lastName: 'Smith' };

const account1 = bank.createAccount(client1, CurrencyTypeEnum.USD, new CurrencyConverter());
const account2 = bank.createAccount(client2, CurrencyTypeEnum.EUR, new CurrencyConverter());

const smsNotification = new SMSNotification();
const emailNotification = new EmailNotification();
const pushNotification = new PushNotification();

account1.setNotificationService(smsNotification);
account2.setNotificationService(emailNotification);

account1.deposit(500);
account2.deposit(200);

account1.withdraw(100);
account2.makeTransaction(50, CurrencyTypeEnum.GBP);

bank.closeAccount(account1);
