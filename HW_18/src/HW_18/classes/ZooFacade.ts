import { SellmentTickets } from "./SellmentTickets"
import { AdvertisementDepartment } from "./AdvertisementDepartment"
import { AccountingDepartment } from "./AccountingDepartment"

export class ZooFacade {
    public sellmentTickets: SellmentTickets
    private advertisementDepartment: AdvertisementDepartment
    private accountingDepartment: AccountingDepartment

    constructor() {
        this.sellmentTickets = new SellmentTickets()
        this.advertisementDepartment = new AdvertisementDepartment(
            'Marketing Department'
        )
        this.accountingDepartment = new AccountingDepartment(
            'Finance Department',
            10000
        )
    }

    public sellTicket(ticket: ITicket, visitor: IPerson) {
        this.sellmentTickets.addClient(visitor)
        this.sellmentTickets.ListOfClients.push(visitor)
        this.sellmentTickets.listOfPresentGuests.push(visitor)
        this.sellmentTickets.addTicketToStore(ticket)
        this.sellmentTickets.sendNews(
            { news: 'New Ticket Sold!' },
            {
                actionsAd: ['Special Offer'],
                events: ['Sale'],
            }
        )
    }

    public generateFinancialReports() {
        this.accountingDepartment.generateFinancialReports()
    }

    public addEmployee(employee: IEmployee) {
        this.accountingDepartment.addEmployee(employee)
    }
}