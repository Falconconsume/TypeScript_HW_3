export class Visitor implements IObserver {
    private name: string
    private contacts: string

    constructor(name: string, contacts: string) {
        this.name = name
        this.contacts = contacts
    }

    update(message: string) {
        console.log(`Visitor ${this.name} received a notification: ${message}`)
    }

    updateBeforeClosing() {
        console.log(
            `Visitor ${this.name}, the zoo is closing in 15 minutes. Please prepare to leave.`
        )
    }

    updateBeforeDeparture() {
        console.log(`Thank you, Visitor ${this.name}! Please come back again.`)
    }
}