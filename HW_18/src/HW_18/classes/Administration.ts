export class Administration implements IAdministration {
    private employeesList: IEmployee[] = []

    addEmployee(employee: IEmployee) {
        this.employeesList.push(employee)
        console.log(`Adding employee: ${employee.name}`)
        console.log(`Adding employee: ${employee.name}`)
        console.log(`Position: ${employee.position}`)
        console.log(`Duties: ${employee.duties.join(', ')}`)
    }

    removeEmployee(employee: IEmployee) {
        const employeeRemove = this.employeesList.indexOf(employee)
        console.log(`Removing employee: ${employee.name}`)
        this.employeesList.splice(employeeRemove, 1)
    }

    createNotification(notify: string): IActionAd {
        return {
            actionsAd: [`${this.constructor.name} - ${notify}`],
            events: [`${this.constructor.name} Notification`],
        }
    }
}