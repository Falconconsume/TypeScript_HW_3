import { SellmentTickets } from '../classes/SellmentTickets'

describe('SellmentTickets', () => {
    let sellmentTickets: SellmentTickets;

    beforeEach(() => {
        sellmentTickets = new SellmentTickets()
    })
    it('addClient should add a client to the list', () => {
        const client = { name: 'John Doe', contacts: 'john@example.com' }
        sellmentTickets.addClient(client)
        expect(sellmentTickets.listOfPresentGuests).toContain(client)
        expect(sellmentTickets.ListOfClients).toContain(client)
    })

    it('addTicketToStore should add a ticket to the store', () => {
        const ticket = { price: 20, type: 'Adult' }
        sellmentTickets.addTicketToStore(ticket)
        expect(sellmentTickets.ticketStore).toContain(ticket)
    })

    it('sendNews should log news and actions', () => {
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
