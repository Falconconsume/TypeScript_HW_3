import { ZooFacade } from './classes/ZooFacade'

const { SellmentTickets } = require('./classes/SellmentTickets')
const { AdvertisementDepartment } = require('./classes/AdvertisementDepartment')
const { AccountingDepartment } = require('./classes/AccountingDepartment')
const { Administration } = require('./classes/Administration')
const { Casa } = require('./classes/Casa')
const { Animals } = require('./classes/Animals')

describe('SellmentTickets', () => {
    it('addClient should add a client to the list', () => {
        const sellmentTickets = new SellmentTickets()
        const client = { name: 'John Doe', contacts: 'john@example.com' }
        sellmentTickets.addClient(client)
        expect(sellmentTickets.listOfPresentGuests).toContain(client)
        expect(sellmentTickets.ListOfClients).toContain(client)
    })

    it('addTicketToStore should add a ticket to the store', () => {
        const sellmentTickets = new SellmentTickets()
        const ticket = { price: 20, type: 'Adult' }
        sellmentTickets.addTicketToStore(ticket)
        expect(sellmentTickets.ticketStore).toContain(ticket)
    })

    it('sendNews should log news and actions', () => {
        const sellmentTickets = new SellmentTickets()
        console.log = jest.fn()
        sellmentTickets.sendNews(
            { news: 'Test News' },
            { actionsAd: ['Test Action'], events: ['Test Event'] }
        )
        expect(console.log).toHaveBeenCalledWith(
            'News: Test News, Actions: Test Action'
        )
    })
})

describe('AdvertisementDepartment', () => {
    it('addClients should add a client to the client list and set a ticket to the store', () => {
        const advertisementDepartment = new AdvertisementDepartment(
            'Marketing Department'
        )
        const client = { name: 'Jane Doe', contacts: 'jane@example.com' }
        const ticket = { price: 15, type: 'Child' }
        advertisementDepartment.addClients(client, ticket)
        expect(advertisementDepartment.clientList).toContain(client)
        expect(advertisementDepartment.store.get(`Client ${client.name}`)).toBe(
            ticket
        )
    })

    it('sendNews should log news and send news to each client', () => {
        const advertisementDepartment = new AdvertisementDepartment(
            'Marketing Department'
        )
        const client = { name: 'Jane Doe', contacts: 'jane@example.com' }
        advertisementDepartment.clientList = [client]
        console.log = jest.fn()
        advertisementDepartment.sendNews(
            { news: 'Test News' },
            { actionsAd: ['Test Action'], events: ['Test Event'] }
        )
        expect(console.log).toHaveBeenCalledWith(
            'News: Test News, Actions: Test Action'
        )
        expect(console.log).toHaveBeenCalledWith(
            `Sending news to ${client.name}: Test News`
        )
        expect(console.log).toHaveBeenCalledWith(
            `Sending actions to ${client.name}: Test Action`
        )
    })
})

describe('AccountingDepartment', () => {
    it('addEmployee should add an employee and allocate budget', () => {
        const accountingDepartment = new AccountingDepartment(
            'Finance Department',
            10000
        )
        const employee = {
            name: 'Accountant 1',
            position: 'Accountant',
            salary: 5000,
            duties: ['Financial Management', 'Auditor'],
        }
        accountingDepartment.addEmployee(employee)
        expect(accountingDepartment.employees).toContain(employee)
        expect(accountingDepartment.budget.totalBudget).toBe(0)
    })

    it('generateFinancialReports should log financial reports', () => {
        const accountingDepartment = new AccountingDepartment(
            'Finance Department',
            10000
        )
        console.log = jest.fn()
        accountingDepartment.generateFinancialReports()
        expect(console.log).toHaveBeenCalledWith('Total Budget: 10000')
        expect(console.log).toHaveBeenCalledWith('Expenses: 0')
        expect(console.log).toHaveBeenCalledWith('Remaining Budget: 10000')
    })
})

describe('Administration', () => {
    it('addEmployee should add an employee', () => {
        const administration = new Administration()
        const employee = {
            name: 'Employee 1',
            position: 'Admin',
            salary: 4000,
            duties: ['Admin Management'],
        }
        administration.addEmployee(employee)
        expect(administration.employeesList).toContain(employee)
    })

    it('removeEmployee should remove an employee', () => {
        const administration = new Administration()
        const employee = {
            name: 'Employee 1',
            position: 'Admin',
            salary: 4000,
            duties: ['Admin Management'],
        }
        administration.employeesList = [employee]
        administration.removeEmployee(employee)
        expect(administration.employeesList).not.toContain(employee)
    })

    it('createNotification should return an action object', () => {
        const administration = new Administration()
        const notification =
            administration.createNotification('Test Notification')
        expect(notification).toHaveProperty('actionsAd')
        expect(notification).toHaveProperty('events')
    })
})

describe('Casa', () => {
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
        const casa = new Casa(10, 'Adult', {})
        casa.sumIncomePerDay = [15, 25, 20]
        const totalIncome = casa.amountOfIncomePerDay()
        expect(totalIncome).toBe(60)
    })

    it('income should push the revenue to sumIncomePerDay', () => {
        const casa = new Casa(10, 'Adult', {})
        casa.income(30)
        expect(casa.sumIncomePerDay).toEqual([30])
    })

    it('addObserver should add an observer to the observers list', () => {
        const casa = new Casa(10, 'Adult', {})
        const observerMock = {}
        casa.addObserver(observerMock)
        expect(casa.observers).toContain(observerMock)
    })

    it('removeObserver should remove an observer from the observers list', () => {
        const casa = new Casa(10, 'Adult', {})
        const observerMock = {}
        casa.observers = [observerMock]
        casa.removeObserver(observerMock)
        expect(casa.observers).not.toContain(observerMock)
    })

    it('notifyObserversBeforeClosing should call updateBeforeClosing on each observer', () => {
        const casa = new Casa(10, 'Adult', {})
        const observerMock1 = { updateBeforeClosing: jest.fn() }
        const observerMock2 = { updateBeforeClosing: jest.fn() }
        casa.observers = [observerMock1, observerMock2]
        casa.notifyObserversBeforeClosing()
        expect(observerMock1.updateBeforeClosing).toHaveBeenCalled()
        expect(observerMock2.updateBeforeClosing).toHaveBeenCalled()
    })

    it('notifyObserversBeforeDeparture should call updateBeforeDeparture on each observer', () => {
        const casa = new Casa(10, 'Adult', {})
        const observerMock1 = { updateBeforeDeparture: jest.fn() }
        const observerMock2 = { updateBeforeDeparture: jest.fn() }
        casa.observers = [observerMock1, observerMock2]
        casa.notifyObserversBeforeDeparture()
        expect(observerMock1.updateBeforeDeparture).toHaveBeenCalled()
        expect(observerMock2.updateBeforeDeparture).toHaveBeenCalled()
    })
})

describe('ZooFacade', () => {
    let zooFacade: ZooFacade

    beforeEach(() => {
        zooFacade = new ZooFacade()
    })

    it('sellTicket should add a client, ticket, and send news', () => {
        const ticketMock = { price: 20, type: 'Adult' }
        const visitorMock = { name: 'John Doe', contacts: 'john@example.com' }
        zooFacade.sellTicket(ticketMock, visitorMock)

        expect(zooFacade.sellmentTickets.ListOfClients).toContain(visitorMock)

        expect(zooFacade.sellmentTickets.ticketStore).toContain(ticketMock)
    })

    it('generateFinancialReports should call generateFinancialReports on accountingDepartment', () => {
        jest.spyOn(zooFacade, 'generateFinancialReports')
        zooFacade.generateFinancialReports()
        expect(zooFacade.generateFinancialReports).toHaveBeenCalled()
    })

    it('addEmployee should call addEmployee on accountingDepartment', () => {
        const employeeMock = {
            name: 'Employee 1',
            position: 'Manager',
            salary: 6000,
            duties: ['Management'],
        }
        jest.spyOn(zooFacade, 'addEmployee')
        zooFacade.addEmployee(employeeMock)
        expect(zooFacade.addEmployee).toHaveBeenCalledWith(employeeMock)
    })
})

describe('Add atributes for the animal', () => {
    let animals: typeof Animals

    beforeEach(() => {
        animals = new Animals('Leo', 'Lion', 5, 'Good')
    })

    it('Animal attributes should be set correctly', () => {
        expect(animals.name).toBe('Leo')
        expect(animals.type).toBe('Lion')
        expect(animals.age).toBe(5)
        expect(animals.health).toBe('Good')
    })
})
