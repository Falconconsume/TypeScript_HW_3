
export class SellmentTickets implements ISellmentTickets {
    public listOfPresentGuests: IPerson[] = []
    public ListOfClients: IPerson[] = []
    public ticketStore: ITicket[] = []

    addClient(user: IPerson) {
        this.listOfPresentGuests.push(user)
        this.ListOfClients.push(user)
    }

    addTicketToStore(ticket: ITicket) {
        this.ticketStore.push(ticket)
    }

    sendNews(news: INews, actions: IActionAd) {
        console.log(`News: ${news.news}, Actions: ${actions.actionsAd}`)
    }
}