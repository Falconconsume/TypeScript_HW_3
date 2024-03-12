export class AdultTicketPricingStrategy implements ITicketPricingStrategy {
    calculatePrice(basePrice: number) {
        return basePrice
    }
}

export class ChildTicketPricingStrategy implements ITicketPricingStrategy {
    calculatePrice(basePrice: number) {
        return basePrice * 0.8
    }
}

export class FamilyTicketPricingStrategy implements ITicketPricingStrategy {
    calculatePrice(basePrice: number) {
        return basePrice * 2
    }
}
