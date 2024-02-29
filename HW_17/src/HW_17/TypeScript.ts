type AdultTicket = string;
type ChildTicket = string;
type FamilyTicket = string;

type TypeOfTicket = AdultTicket | ChildTicket | FamilyTicket;

interface ITicket {
    price: number;
    type: TypeOfTicket;
}

interface IPerson {
    name: string;
    contacts: string;
}

interface IEmployee {
    name: string;
    position: string;
    salary: number;
    duties: string[];
}

interface IAnimal {
    type: string;
    name: string;
    age: number;
    health: 'Good' | 'Bad';
}

interface ISellmentTickets {
    listOfPresentGuests: IPerson[];
    ListOfClients: IPerson[];
    addClient: (user: IPerson) => void;
}

interface IDepartment {
    name: string;
}

interface IAdvertisementDepartment extends IDepartment {
    store: Map<string, ITicket>;
    addClients: (client: IPerson, ticket: ITicket) => void;
    sendNews: (news: INews, actions: IActionAd) => void;
}

interface INews {
    news: string;
}

interface IActionAd {
    actionsAd: string[];
    events: string[];
}

interface IRevenue {
    incomesRevenue?: number;
    income: (revenue: number) => void;
}

interface IAccountingDepartment extends IDepartment {
    employees: IEmployee[];
    animals: IAnimal[];
    budget: IBudget;
    generateFinancialReports: () => void;
}

interface IBudget {
    totalBudget: number;
    allocateBudget(amount: number): void;
    generateFinancialReports(): void;
}

interface IAdministration {
    addEmployee: (employee: IEmployee) => void;
    removeEmployee: (employee: IEmployee) => void;
    createNotification: (notify: string) => IActionAd;
}

interface ITicketPricingStrategy {
    calculatePrice(basePrice: number): number;
}

interface IVisitorObserver {
    updateBeforeClosing(): void;
    updateBeforeDeparture(): void;
}

interface IObserver extends IVisitorObserver {
    update(message: string): void;
}

class AdultTicketPricingStrategy implements ITicketPricingStrategy {
    calculatePrice(basePrice: number) {
        return basePrice;
    }
}

class ChildTicketPricingStrategy implements ITicketPricingStrategy {
    calculatePrice(basePrice: number) {
        return basePrice * 0.8;
    }
}

class FamilyTicketPricingStrategy implements ITicketPricingStrategy {
    calculatePrice(basePrice: number) {
        return basePrice * 2;
    }
}

class ZooFacade {
    private sellmentTickets: SellmentTickets;
    private advertisementDepartment: AdvertisementDepartment;
    private accountingDepartment: AccountingDepartment;

    constructor() {
        this.sellmentTickets = new SellmentTickets();
        this.advertisementDepartment = new AdvertisementDepartment('Marketing Department');
        this.accountingDepartment = new AccountingDepartment('Finance Department', 10000);
    }

    public sellTicket(ticket: ITicket, visitor: IPerson) {
        this.sellmentTickets.addClient(visitor);
        this.sellmentTickets.ListOfClients.push(visitor);
        this.sellmentTickets.listOfPresentGuests.push(visitor);
        this.sellmentTickets.addTicketToStore(ticket);
        this.sellmentTickets.sendNews({ news: 'New Ticket Sold!' }, {
            actionsAd: ['Special Offer'],
            events: ['Sale']
        });
    }

    public generateFinancialReports() {
        this.accountingDepartment.generateFinancialReports();
    }

    public addEmployee(employee: IEmployee) {
        this.accountingDepartment.addEmployee(employee);
    }
}

interface IObserver {
    update(message: string): void;
}

class Visitor implements IObserver {
    private name: string;
    private contacts: string;

    constructor(name: string, contacts: string) {
        this.name = name;
        this.contacts = contacts;
    }

    update(message: string) {
        console.log(`Visitor ${this.name} received a notification: ${message}`);
    }

    updateBeforeClosing() {
        console.log(`Visitor ${this.name}, the zoo is closing in 15 minutes. Please prepare to leave.`);
    }

    updateBeforeDeparture() {
        console.log(`Thank you, Visitor ${this.name}! Please come back again.`);
    }
}

class Observable {
    private observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public removeObserver(observer: IObserver) {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    public notifyObservers(message: string) {
        this.observers.forEach((observer) => observer.update(message));
    }
}

class Casa implements ITicket, IRevenue {
    public price: number;
    public type: TypeOfTicket;
    private sumIncomePerDay: number[] = [];
    private pricingStrategy: ITicketPricingStrategy;
    private observers: IVisitorObserver[] = [];

    constructor(price: number, type: TypeOfTicket, pricingStrategy: ITicketPricingStrategy) {
        this.price = price;
        this.type = type;
        this.pricingStrategy = pricingStrategy;
    }

    public customerBoughtTheTicket() {
        const calculatedPrice = this.pricingStrategy.calculatePrice(this.price);
        this.sumIncomePerDay.push(calculatedPrice);
    }

    public amountOfIncomePerDay() {
        return this.sumIncomePerDay.reduce((acc, el) => acc + el, 0);
    }

    public income(revenue: number) {
        this.sumIncomePerDay.push(revenue);
    }


    public addObserver(observer: IVisitorObserver) {
        this.observers.push(observer);
    }

    public removeObserver(observer: IVisitorObserver) {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    public notifyObserversBeforeClosing() {
        this.observers.forEach((observer) => observer.updateBeforeClosing());
    }

    public notifyObserversBeforeDeparture() {
        this.observers.forEach((observer) => observer.updateBeforeDeparture());
    }
}

class SellmentTickets implements ISellmentTickets {
    public listOfPresentGuests: IPerson[] = [];
    public ListOfClients: IPerson[] = [];
    public ticketStore: ITicket[] = [];

    addClient(user: IPerson) {
        this.listOfPresentGuests.push(user);
        this.ListOfClients.push(user);
    }

    addTicketToStore(ticket: ITicket) {
        this.ticketStore.push(ticket);
    }

    sendNews(news: INews, actions: IActionAd) {
        console.log(`News: ${news.news}, Actions: ${actions.actionsAd}`);
    }
}

class AdvertisementDepartment implements IAdvertisementDepartment {
    public name: string;
    public clientList: IPerson[] = [];
    public store: Map<string, ITicket> = new Map();

    constructor(name: string) {
        this.name = name;
    }

    addClients(client: IPerson, ticket: ITicket) {
        this.clientList.push(client);
        this.store.set(`Client ${client.name}`, ticket);
    }

    sendNews(news: INews, actions: IActionAd) {
        console.log(`News: ${news.news}, Actions: ${actions.actionsAd}`);
        
        this.clientList.forEach(client => {
            console.log(`Sending news to ${client.name}: ${news.news}`);
            console.log(`Sending actions to ${client.name}: ${actions.actionsAd}`);
        });
    }
}


class AccountingDepartment implements IAccountingDepartment {
    public name: string;
    public employees: IEmployee[] = [];
    public animals: IAnimal[] = [];
    public budget: IBudget;

    constructor(name: string, totalBudget: number) {
        this.name = name;
        this.budget = new Budget(totalBudget);
    }

    generateFinancialReports() {
        console.log(`Generating financial reports for ${this.name}`);
        this.budget.generateFinancialReports();
    }

    addEmployee(employee: IEmployee) {
        this.employees.push(employee);
        this.budget.allocateBudget(employee.salary);
        console.log(`Adding employee: ${employee.name}`);
        console.log(`Position: ${employee.position}`);
        console.log(`Duties: ${employee.duties.join(', ')}`);
    }

    purchaseFood(amount: number) {
        this.budget.allocateBudget(amount);
    }

    performMaintenance(amount: number) {
        this.budget.allocateBudget(amount);
    }
}

class Administration implements IAdministration {
    private employeesList: IEmployee[] = [];

    addEmployee(employee: IEmployee) {
        this.employeesList.push(employee);
        console.log(`Adding employee: ${employee.name}`);
        console.log(`Adding employee: ${employee.name}`);
        console.log(`Position: ${employee.position}`);
        console.log(`Duties: ${employee.duties.join(', ')}`);
    }

    removeEmployee(employee: IEmployee) {
        const employeeRemove = this.employeesList.indexOf(employee);
        console.log(`Removing employee: ${employee.name}`);
        this.employeesList.splice(employeeRemove, 1);
    }

    createNotification(notify: string): IActionAd {
        return {
            actionsAd: [`${this.constructor.name} - ${notify}`],
            events: [`${this.constructor.name} Notification`],
        };
    }
}

class Animals implements IAnimal {
    public name: string;
    public type: string;
    public age: number;
    public health: 'Good' | 'Bad';

    constructor(name: string, type: string, age: number, health: 'Good' | 'Bad') {
        this.name = name;
        this.type = type;
        this.age = age;
        this.health = health;
    }
}

class Budget implements IBudget {
    public totalBudget: number;
    private expenses: number = 0;

    constructor(totalBudget: number) {
        this.totalBudget = totalBudget;
    }

    allocateBudget(amount: number) {
        if (this.totalBudget >= amount) {
            this.totalBudget -= amount;
            this.totalBudget -= amount;
            this.expenses += amount;
            return true;
        } else {
            console.log(`Insufficient budget. Cannot allocate ${amount}.`);
            return false; 
        }

    }
    
    generateFinancialReports() {
        console.log(`Total Budget: ${this.totalBudget}`);
        console.log(`Expenses: ${this.expenses}`);
        console.log(`Remaining Budget: ${this.totalBudget - this.expenses}`);
    }
}

const adultTicketStrategy = new AdultTicketPricingStrategy();
const childTicketStrategy = new ChildTicketPricingStrategy();
const familyTicketStrategy = new FamilyTicketPricingStrategy();

const ticketCasa = new Casa(10, 'Adult', adultTicketStrategy);

const zooFacade = new ZooFacade();

zooFacade.sellTicket(ticketCasa, { name: 'John Doe', contacts: 'john@example.com' });

const advertisementDepartment = new AdvertisementDepartment('Marketing Department');

advertisementDepartment.addClients({ name: 'Jane Doe', contacts: 'jane@example.com' }, ticketCasa);

advertisementDepartment.sendNews({ news: 'New Attraction Opened!' }, { actionsAd: ['Discount on Family Tickets'], events: ['Special Event'] });

const accountingDepartment = new AccountingDepartment('Finance Department', 10000);

accountingDepartment.addEmployee({ name: 'Accountant 1', position: 'Accountant', salary: 5000, duties: ['Financial Management', 'Auditor'] });

accountingDepartment.generateFinancialReports();

const administration = new Administration();

accountingDepartment.addEmployee({ name: 'Employee 1', position: 'Accountant', salary: 5000, duties: ['Financial Management', 'Auditor'] });
administration.removeEmployee({ name: 'Employee 1', position: 'Accountant', salary: 5000, duties: ['Financial Management', 'Auditor'] });

const lion = new Animals('Leo', 'Lion', 5, 'Good');
