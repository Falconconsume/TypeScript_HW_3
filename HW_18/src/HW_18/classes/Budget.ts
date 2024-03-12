export class Budget implements IBudget {
    public totalBudget: number
    private expenses: number = 0

    constructor(totalBudget: number) {
        this.totalBudget = totalBudget
    }

    allocateBudget(amount: number) {
        if (this.totalBudget >= amount) {
            this.totalBudget -= amount
            this.totalBudget -= amount
            this.expenses += amount
            return true
        } else {
            console.log(`Insufficient budget. Cannot allocate ${amount}.`)
            return false
        }
    }

    generateFinancialReports() {
        console.log(`Total Budget: ${this.totalBudget}`)
        console.log(`Expenses: ${this.expenses}`)
        console.log(`Remaining Budget: ${this.totalBudget - this.expenses}`)
    }
}