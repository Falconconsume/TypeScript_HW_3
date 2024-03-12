
export class Casa implements ITicket, IRevenue {
    public price: number
    public type: TypeOfTicket
    private sumIncomePerDay: number[] = []
    private pricingStrategy: ITicketPricingStrategy
    private observers: IVisitorObserver[] = []

    constructor(
        price: number,
        type: TypeOfTicket,
        pricingStrategy: ITicketPricingStrategy
    ) {
        this.price = price
        this.type = type
        this.pricingStrategy = pricingStrategy
    }

    public customerBoughtTheTicket() {
        const calculatedPrice = this.pricingStrategy.calculatePrice(this.price)
        this.sumIncomePerDay.push(calculatedPrice)
    }

    public amountOfIncomePerDay() {
        return this.sumIncomePerDay.reduce((acc, el) => acc + el, 0)
    }

    public income(revenue: number) {
        this.sumIncomePerDay.push(revenue)
    }

    public addObserver(observer: IVisitorObserver) {
        this.observers.push(observer)
    }

    public removeObserver(observer: IVisitorObserver) {
        this.observers = this.observers.filter((o) => o !== observer)
    }

    public notifyObserversBeforeClosing() {
        this.observers.forEach((observer) => observer.updateBeforeClosing())
    }

    public notifyObserversBeforeDeparture() {
        this.observers.forEach((observer) => observer.updateBeforeDeparture())
    }
}
