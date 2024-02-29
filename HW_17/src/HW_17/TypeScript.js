var AdultTicketPricingStrategy = /** @class */ (function () {
    function AdultTicketPricingStrategy() {
    }
    AdultTicketPricingStrategy.prototype.calculatePrice = function (basePrice) {
        return basePrice;
    };
    return AdultTicketPricingStrategy;
}());
var ChildTicketPricingStrategy = /** @class */ (function () {
    function ChildTicketPricingStrategy() {
    }
    ChildTicketPricingStrategy.prototype.calculatePrice = function (basePrice) {
        return basePrice * 0.8;
    };
    return ChildTicketPricingStrategy;
}());
var FamilyTicketPricingStrategy = /** @class */ (function () {
    function FamilyTicketPricingStrategy() {
    }
    FamilyTicketPricingStrategy.prototype.calculatePrice = function (basePrice) {
        return basePrice * 2;
    };
    return FamilyTicketPricingStrategy;
}());
var ZooFacade = /** @class */ (function () {
    function ZooFacade() {
        this.sellmentTickets = new SellmentTickets();
        this.advertisementDepartment = new AdvertisementDepartment('Marketing Department');
        this.accountingDepartment = new AccountingDepartment('Finance Department', 10000);
    }
    ZooFacade.prototype.sellTicket = function (ticket, visitor) {
        this.sellmentTickets.addClient(visitor);
        this.sellmentTickets.ListOfClients.push(visitor);
        this.sellmentTickets.listOfPresentGuests.push(visitor);
        this.sellmentTickets.addTicketToStore(ticket);
        this.sellmentTickets.sendNews({ news: 'New Ticket Sold!' }, {
            actionsAd: ['Special Offer'],
            events: ['Sale']
        });
    };
    ZooFacade.prototype.generateFinancialReports = function () {
        this.accountingDepartment.generateFinancialReports();
    };
    ZooFacade.prototype.addEmployee = function (employee) {
        this.accountingDepartment.addEmployee(employee);
    };
    return ZooFacade;
}());
var Visitor = /** @class */ (function () {
    function Visitor(name, contacts) {
        this.name = name;
        this.contacts = contacts;
    }
    Visitor.prototype.update = function (message) {
        console.log("Visitor ".concat(this.name, " received a notification: ").concat(message));
    };
    Visitor.prototype.updateBeforeClosing = function () {
        console.log("Visitor ".concat(this.name, ", the zoo is closing in 15 minutes. Please prepare to leave."));
    };
    Visitor.prototype.updateBeforeDeparture = function () {
        console.log("Thank you, Visitor ".concat(this.name, "! Please come back again."));
    };
    return Visitor;
}());
var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    Observable.prototype.removeObserver = function (observer) {
        this.observers = this.observers.filter(function (o) { return o !== observer; });
    };
    Observable.prototype.notifyObservers = function (message) {
        this.observers.forEach(function (observer) { return observer.update(message); });
    };
    return Observable;
}());
var Casa = /** @class */ (function () {
    function Casa(price, type, pricingStrategy) {
        this.sumIncomePerDay = [];
        this.observers = [];
        this.price = price;
        this.type = type;
        this.pricingStrategy = pricingStrategy;
    }
    Casa.prototype.customerBoughtTheTicket = function () {
        var calculatedPrice = this.pricingStrategy.calculatePrice(this.price);
        this.sumIncomePerDay.push(calculatedPrice);
    };
    Casa.prototype.amountOfIncomePerDay = function () {
        return this.sumIncomePerDay.reduce(function (acc, el) { return acc + el; }, 0);
    };
    Casa.prototype.income = function (revenue) {
        this.sumIncomePerDay.push(revenue);
    };
    Casa.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    Casa.prototype.removeObserver = function (observer) {
        this.observers = this.observers.filter(function (o) { return o !== observer; });
    };
    Casa.prototype.notifyObserversBeforeClosing = function () {
        this.observers.forEach(function (observer) { return observer.updateBeforeClosing(); });
    };
    Casa.prototype.notifyObserversBeforeDeparture = function () {
        this.observers.forEach(function (observer) { return observer.updateBeforeDeparture(); });
    };
    return Casa;
}());
var SellmentTickets = /** @class */ (function () {
    function SellmentTickets() {
        this.listOfPresentGuests = [];
        this.ListOfClients = [];
        this.ticketStore = [];
    }
    SellmentTickets.prototype.addClient = function (user) {
        this.listOfPresentGuests.push(user);
        this.ListOfClients.push(user);
    };
    SellmentTickets.prototype.addTicketToStore = function (ticket) {
        this.ticketStore.push(ticket);
    };
    SellmentTickets.prototype.sendNews = function (news, actions) {
        console.log("News: ".concat(news.news, ", Actions: ").concat(actions.actionsAd));
    };
    return SellmentTickets;
}());
var AdvertisementDepartment = /** @class */ (function () {
    function AdvertisementDepartment(name) {
        this.clientList = [];
        this.store = new Map();
        this.name = name;
    }
    AdvertisementDepartment.prototype.addClients = function (client, ticket) {
        this.clientList.push(client);
        this.store.set("Client ".concat(client.name), ticket);
    };
    AdvertisementDepartment.prototype.sendNews = function (news, actions) {
        console.log("News: ".concat(news.news, ", Actions: ").concat(actions.actionsAd));
        this.clientList.forEach(function (client) {
            console.log("Sending news to ".concat(client.name, ": ").concat(news.news));
            console.log("Sending actions to ".concat(client.name, ": ").concat(actions.actionsAd));
        });
    };
    return AdvertisementDepartment;
}());
var AccountingDepartment = /** @class */ (function () {
    function AccountingDepartment(name, totalBudget) {
        this.employees = [];
        this.animals = [];
        this.name = name;
        this.budget = new Budget(totalBudget);
    }
    AccountingDepartment.prototype.generateFinancialReports = function () {
        console.log("Generating financial reports for ".concat(this.name));
        this.budget.generateFinancialReports();
    };
    AccountingDepartment.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
        this.budget.allocateBudget(employee.salary);
        console.log("Adding employee: ".concat(employee.name));
        console.log("Position: ".concat(employee.position));
        console.log("Duties: ".concat(employee.duties.join(', ')));
    };
    AccountingDepartment.prototype.purchaseFood = function (amount) {
        this.budget.allocateBudget(amount);
    };
    AccountingDepartment.prototype.performMaintenance = function (amount) {
        this.budget.allocateBudget(amount);
    };
    return AccountingDepartment;
}());
var Administration = /** @class */ (function () {
    function Administration() {
        this.employeesList = [];
    }
    Administration.prototype.addEmployee = function (employee) {
        this.employeesList.push(employee);
        console.log("Adding employee: ".concat(employee.name));
        console.log("Adding employee: ".concat(employee.name));
        console.log("Position: ".concat(employee.position));
        console.log("Duties: ".concat(employee.duties.join(', ')));
    };
    Administration.prototype.removeEmployee = function (employee) {
        var employeeRemove = this.employeesList.indexOf(employee);
        console.log("Removing employee: ".concat(employee.name));
        this.employeesList.splice(employeeRemove, 1);
    };
    Administration.prototype.createNotification = function (notify) {
        return {
            actionsAd: ["".concat(this.constructor.name, " - ").concat(notify)],
            events: ["".concat(this.constructor.name, " Notification")],
        };
    };
    return Administration;
}());
var Animals = /** @class */ (function () {
    function Animals(name, type, age, health) {
        this.name = name;
        this.type = type;
        this.age = age;
        this.health = health;
    }
    return Animals;
}());
var Budget = /** @class */ (function () {
    function Budget(totalBudget) {
        this.expenses = 0;
        this.totalBudget = totalBudget;
    }
    Budget.prototype.allocateBudget = function (amount) {
        if (this.totalBudget >= amount) {
            this.totalBudget -= amount;
            this.totalBudget -= amount;
            this.expenses += amount;
            return true;
        }
        else {
            console.log("Insufficient budget. Cannot allocate ".concat(amount, "."));
            return false;
        }
    };
    Budget.prototype.generateFinancialReports = function () {
        console.log("Total Budget: ".concat(this.totalBudget));
        console.log("Expenses: ".concat(this.expenses));
        console.log("Remaining Budget: ".concat(this.totalBudget - this.expenses));
    };
    return Budget;
}());
var adultTicketStrategy = new AdultTicketPricingStrategy();
var childTicketStrategy = new ChildTicketPricingStrategy();
var familyTicketStrategy = new FamilyTicketPricingStrategy();
var ticketCasa = new Casa(10, 'Adult', adultTicketStrategy);
var zooFacade = new ZooFacade();
zooFacade.sellTicket(ticketCasa, { name: 'John Doe', contacts: 'john@example.com' });
var advertisementDepartment = new AdvertisementDepartment('Marketing Department');
advertisementDepartment.addClients({ name: 'Jane Doe', contacts: 'jane@example.com' }, ticketCasa);
advertisementDepartment.sendNews({ news: 'New Attraction Opened!' }, { actionsAd: ['Discount on Family Tickets'], events: ['Special Event'] });
var accountingDepartment = new AccountingDepartment('Finance Department', 10000);
accountingDepartment.addEmployee({ name: 'Accountant 1', position: 'Accountant', salary: 5000, duties: ['Financial Management', 'Auditor'] });
accountingDepartment.generateFinancialReports();
var administration = new Administration();
accountingDepartment.addEmployee({ name: 'Employee 1', position: 'Accountant', salary: 5000, duties: ['Financial Management', 'Auditor'] });
administration.removeEmployee({ name: 'Employee 1', position: 'Accountant', salary: 5000, duties: ['Financial Management', 'Auditor'] });
var lion = new Animals('Leo', 'Lion', 5, 'Good');
