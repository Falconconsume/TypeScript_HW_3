export class Casa {
    public sumIncomePerDay: number[] = []
    public observers: IVisitorObserver[] = []

    constructor(
        public price: number,
        public type: TypeOfTicket,
        public pricingStrategy: ITicketPricingStrategy
    ) {}

    customerBoughtTheTicket() {
        const calculatedPrice = this.pricingStrategy.calculatePrice(this.price)
        this.sumIncomePerDay.push(calculatedPrice)
    }

    amountOfIncomePerDay() {
        return this.sumIncomePerDay.reduce((acc, el) => acc + el, 0)
    }

    income(revenue: number) {
        this.sumIncomePerDay.push(revenue)
    }

    addObserver(observer: IVisitorObserver) {
        this.observers.push(observer)
    }

    removeObserver(observer: IVisitorObserver) {
        this.observers = this.observers.filter((o) => o !== observer)
    }

    notifyObserversBeforeClosing() {
        this.observers.forEach((observer) => observer.updateBeforeClosing())
    }

    notifyObserversBeforeDeparture() {
        this.observers.forEach((observer) => observer.updateBeforeDeparture())
    }
}
