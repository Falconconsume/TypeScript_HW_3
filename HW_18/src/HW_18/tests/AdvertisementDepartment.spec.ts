import { AdvertisementDepartment } from '../classes/AdvertisementDepartment'

describe('AdvertisementDepartment', () => {
    let advertisementDepartment: AdvertisementDepartment

    beforeEach(() => {
        advertisementDepartment = new AdvertisementDepartment(
            'Marketing Department'
        )
    })

    it('addClients should add a client to the client list and set a ticket to the store', () => {
        const client = { name: 'Jane Doe', contacts: 'jane@example.com' }
        const ticket = { price: 15, type: 'Child' }
        advertisementDepartment.addClients(client, ticket)
        expect(advertisementDepartment.clientList).toContain(client)
        expect(advertisementDepartment.store.get(`Client ${client.name}`)).toBe(
            ticket
        )
    })

    it('sendNews should log news and send news to each client', () => {
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
