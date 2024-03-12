import { AdultTicketPricingStrategy } from "./classes/TicketPricingStrategy"
import { ChildTicketPricingStrategy } from "./classes/TicketPricingStrategy"
import { FamilyTicketPricingStrategy } from "./classes/TicketPricingStrategy"
import { Casa } from "./classes/Casa"
import { ZooFacade } from "./classes/ZooFacade"
import { AdvertisementDepartment } from "./classes/AdvertisementDepartment"
import { AccountingDepartment } from "./classes/AccountingDepartment"
import { Administration } from "./classes/Administration"
import { Animals } from "./classes/Animals"

const adultTicketStrategy = new AdultTicketPricingStrategy()
const childTicketStrategy = new ChildTicketPricingStrategy()
const familyTicketStrategy = new FamilyTicketPricingStrategy()

const ticketCasa = new Casa(10, 'Adult', adultTicketStrategy)

const zooFacade = new ZooFacade()

zooFacade.sellTicket(ticketCasa, {
    name: 'John Doe',
    contacts: 'john@example.com',
})

const advertisementDepartment = new AdvertisementDepartment(
    'Marketing Department'
)

advertisementDepartment.addClients(
    { name: 'Jane Doe', contacts: 'jane@example.com' },
    ticketCasa
)

advertisementDepartment.sendNews(
    { news: 'New Attraction Opened!' },
    { actionsAd: ['Discount on Family Tickets'], events: ['Special Event'] }
)

const accountingDepartment = new AccountingDepartment(
    'Finance Department',
    10000
)

accountingDepartment.addEmployee({
    name: 'Accountant 1',
    position: 'Accountant',
    salary: 5000,
    duties: ['Financial Management', 'Auditor'],
})

accountingDepartment.generateFinancialReports()

const administration = new Administration()

accountingDepartment.addEmployee({
    name: 'Employee 1',
    position: 'Accountant',
    salary: 5000,
    duties: ['Financial Management', 'Auditor'],
})
administration.removeEmployee({
    name: 'Employee 1',
    position: 'Accountant',
    salary: 5000,
    duties: ['Financial Management', 'Auditor'],
})

const lion = new Animals('Leo', 'Lion', 5, 'Good')
