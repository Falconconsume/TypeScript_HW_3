import { AccountingDepartment } from '../classes/AccountingDepartment'

describe('AccountingDepartment', () => {
    let accountingDepartment: AccountingDepartment

    beforeEach(() => {
        accountingDepartment = new AccountingDepartment(
            'Finance Department',
            10000
        )
    })

    it('addEmployee should add an employee and allocate budget', () => {
        const employee = {
            name: 'Accountant 1',
            position: 'Accountant',
            salary: 5000,
            duties: ['Financial Management', 'Auditor'],
        }
        accountingDepartment.addEmployee(employee)
        expect(accountingDepartment.employees).toContain(employee)
        expect(accountingDepartment.budget.totalBudget).toBe(0)
    })

    it('generateFinancialReports should log financial reports', () => {

        console.log = jest.fn()
        accountingDepartment.generateFinancialReports()
        expect(console.log).toHaveBeenCalledWith('Total Budget: 10000')
        expect(console.log).toHaveBeenCalledWith('Expenses: 0')
        expect(console.log).toHaveBeenCalledWith('Remaining Budget: 10000')
    })
})
