interface ITicket {
    price: number
    type: TypeOfTicket
}

interface IPerson {
    name: string
    contacts: string
}

interface IEmployee {
    name: string
    position: string
    salary: number
    duties: string[]
}

interface IAnimal {
    type: string
    name: string
    age: number
    health: 'Good' | 'Bad'
}

interface ISellmentTickets {
    listOfPresentGuests: IPerson[]
    ListOfClients: IPerson[]
    addClient: (user: IPerson) => void
}

interface IDepartment {
    name: string
}

interface IAdvertisementDepartment extends IDepartment {
    store: Map<string, ITicket>
    addClients: (client: IPerson, ticket: ITicket) => void
    sendNews: (news: INews, actions: IActionAd) => void
}

interface INews {
    news: string
}

interface IActionAd {
    actionsAd: string[]
    events: string[]
}

interface IRevenue {
    incomesRevenue?: number
    income: (revenue: number) => void
}

interface IAccountingDepartment extends IDepartment {
    employees: IEmployee[]
    animals: IAnimal[]
    budget: IBudget
    generateFinancialReports: () => void
}

interface IBudget {
    totalBudget: number
    allocateBudget(amount: number): void
    generateFinancialReports(): void
}

interface IAdministration {
    addEmployee: (employee: IEmployee) => void
    removeEmployee: (employee: IEmployee) => void
    createNotification: (notify: string) => IActionAd
}

interface ITicketPricingStrategy {
    calculatePrice(basePrice: number): number
}

interface IVisitorObserver {
    updateBeforeClosing(): void
    updateBeforeDeparture(): void
}

interface IObserver extends IVisitorObserver {
    update(message: string): void
}
