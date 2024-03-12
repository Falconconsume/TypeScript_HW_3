import { Budget } from './Budget'

export class AccountingDepartment implements IAccountingDepartment {
    public name: string
    public employees: IEmployee[] = []
    public animals: IAnimal[] = []
    public budget: IBudget

    constructor(name: string, totalBudget: number) {
        this.name = name
        this.budget = new Budget(totalBudget)
    }

    generateFinancialReports() {
        console.log(`Generating financial reports for ${this.name}`)
        this.budget.generateFinancialReports()
    }

    addEmployee(employee: IEmployee) {
        this.employees.push(employee)
        this.budget.allocateBudget(employee.salary)
        console.log(`Adding employee: ${employee.name}`)
        console.log(`Position: ${employee.position}`)
        console.log(`Duties: ${employee.duties.join(', ')}`)
    }

    purchaseFood(amount: number) {
        this.budget.allocateBudget(amount)
    }

    performMaintenance(amount: number) {
        this.budget.allocateBudget(amount)
    }
}
