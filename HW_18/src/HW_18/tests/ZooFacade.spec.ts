import { ZooFacade } from '../classes/ZooFacade'

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
