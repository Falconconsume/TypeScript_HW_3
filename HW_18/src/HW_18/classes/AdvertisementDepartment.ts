export class AdvertisementDepartment implements IAdvertisementDepartment {
    public name: string
    public clientList: IPerson[] = []
    public store: Map<string, ITicket> = new Map()

    constructor(name: string) {
        this.name = name
    }

    addClients(client: IPerson, ticket: ITicket) {
        this.clientList.push(client)
        this.store.set(`Client ${client.name}`, ticket)
    }

    sendNews(news: INews, actions: IActionAd) {
        console.log(`News: ${news.news}, Actions: ${actions.actionsAd}`)

        this.clientList.forEach((client) => {
            console.log(`Sending news to ${client.name}: ${news.news}`)
            console.log(
                `Sending actions to ${client.name}: ${actions.actionsAd}`
            )
        })
    }
}