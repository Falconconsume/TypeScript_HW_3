import { Casa } from '../classes/Casa'

describe('Casa', () => {
    let casa: Casa

    beforeEach(() => {
        casa = new Casa(10, 'Adult', {} as ITicketPricingStrategy)
    })
    it('customerBoughtTheTicket should calculate and push the correct price to sumIncomePerDay', () => {
        const pricingStrategyMock = {
            calculatePrice: jest.fn().mockReturnValue(20),
        }
        const casa = new Casa(10, 'Adult', pricingStrategyMock)
        casa.customerBoughtTheTicket()
        expect(pricingStrategyMock.calculatePrice).toHaveBeenCalledWith(10)
        expect(casa.sumIncomePerDay).toEqual([20])
    })

    it('amountOfIncomePerDay should return the total income per day', () => {
        casa.sumIncomePerDay = [15, 25, 20]
        const totalIncome = casa.amountOfIncomePerDay()
        expect(totalIncome).toBe(60)
    })

    it('income should push the revenue to sumIncomePerDay', () => {
        casa.income(30)
        expect(casa.sumIncomePerDay).toEqual([30])
    })

    it('addObserver should add an observer to the observers list', () => {
        const observerMock = {
            updateBeforeClosing: jest.fn(),
            updateBeforeDeparture: jest.fn(),
        } as IVisitorObserver
        casa.addObserver(observerMock)
        expect(casa.observers).toContain(observerMock)
    })

    it('removeObserver should remove an observer from the observers list', () => {
        const observerMock = {
            updateBeforeClosing: jest.fn(),
            updateBeforeDeparture: jest.fn(),
        } as IVisitorObserver
        casa.observers = [observerMock]
        casa.removeObserver(observerMock)
        expect(casa.observers).not.toContain(observerMock)
    })

    it('notifyObserversBeforeClosing should call updateBeforeClosing on each observer', () => {
        const observerMock1 = {
            updateBeforeClosing: jest.fn(),
            updateBeforeDeparture: jest.fn(),
        } as IVisitorObserver
        const observerMock2 = {
            updateBeforeClosing: jest.fn(),
            updateBeforeDeparture: jest.fn(),
        } as IVisitorObserver
        casa.observers = [observerMock1, observerMock2]
        casa.notifyObserversBeforeClosing()
        expect(observerMock1.updateBeforeClosing).toHaveBeenCalled()
        expect(observerMock2.updateBeforeClosing).toHaveBeenCalled()
    })

    it('notifyObserversBeforeDeparture should call updateBeforeDeparture on each observer', () => {
        const observerMock1 = {
            updateBeforeClosing: jest.fn(),
            updateBeforeDeparture: jest.fn(),
        } as IVisitorObserver
        const observerMock2 = {
            updateBeforeClosing: jest.fn(),
            updateBeforeDeparture: jest.fn(),
        } as IVisitorObserver
        casa.observers = [observerMock1, observerMock2]
        casa.notifyObserversBeforeDeparture()
        expect(observerMock1.updateBeforeDeparture).toHaveBeenCalled()
        expect(observerMock2.updateBeforeDeparture).toHaveBeenCalled()
    })
})
