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


abstract class Observable implements IObservable {
  private readonly observers: IObserver[] = [];


  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);


    if (isExist)
      return console.log('Observable: Observer has been attached already.');


    this.observers.push(observer);
    console.log('Observable:: Attached an observer.');
  }


  public detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);


    if (observerIndex === -1)
      return console.log('Observable: Nonexistent observer.');


    this.observers.splice(observerIndex, 1);
    console.log('Observable: Detached an observer.');
  }


  public notify(): void {
    console.log('Observable: Notifying observer...');
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
  
  class Bank implements IObservable {
    private static instance: Bank;
    private readonly accounts: BankAccount[] = [];
    private readonly observers: IObserver[] = [];
  
    private constructor() {}
  
    public static getInstance(): Bank {
      if (!Bank.instance) {
        Bank.instance = new Bank();
      }
      return Bank.instance;
    }
  
    public createAccount(client: BankClient, currency: CurrencyTypeEnum): BankAccount {
      const conversionStrategy = new CurrencyConverter();
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
  
    public attach(observer: IObserver): void {
      const isExist = this.observers.includes(observer);
      if (!isExist) {
        this.observers.push(observer);
      }
    }
  
    public detach(observer: IObserver): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex !== -1) {
        this.observers.splice(observerIndex, 1);
      }
    }
  
    public notify(): void {
      for (const observer of this.observers) {
        observer.update(this);
      }
    }
  }

class BankAccount extends Observable {
  private readonly currency: string;
  private readonly number: number;
  private balance = 1000;
  private _holderName!: string;
  private _conversionStrategy!: ICurrencyConversionStrategy;


  constructor(
    client: BankClient,
    currency: string,
    conversionStrategy: ICurrencyConversionStrategy
  ) {
    super();
    this.currency = currency;
    this.holderName = client;
    this.number = 12345678;
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


  public deposit(amount: number): void {
    this.balance += amount;
  }


  public withdraw(amount: number): void {
    if (this.balance < amount)
      throw new Error(
        `Sorry ${this._holderName}, you don't have enough funds!`
      );


    this.balance -= amount;
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
    this.notify();
    
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

const bank = Bank.getInstance();

const client1: BankClient = { firstName: 'John', lastName: 'Doe' };
const client2: BankClient = { firstName: 'Alice', lastName: 'Smith' };

const account1 = bank.createAccount(client1, CurrencyTypeEnum.USD);
const account2 = bank.createAccount(client2, CurrencyTypeEnum.EUR);

const smsNotification = new SMSNotification();
const emailNotification = new EmailNotification();

bank.attach(smsNotification);
bank.attach(emailNotification);

account1.deposit(500);
account2.deposit(200); 

bank.detach(emailNotification);

account1.withdraw(100); 
account2.makeTransaction(50, CurrencyTypeEnum.GBP); 

bank.closeAccount(account1);