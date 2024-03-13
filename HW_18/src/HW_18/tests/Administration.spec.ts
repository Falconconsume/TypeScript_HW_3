import { Administration } from '../classes/Administration'

describe('Administration', () => {
    let administration: Administration;

    beforeEach(() => {
        administration = new Administration()
    })
    it('addEmployee should add an employee', () => {
        const employee = {
            name: 'Employee 1',
            position: 'Admin',
            salary: 4000,
            duties: ['Admin Management'],
        }
        administration.addEmployee(employee)
        expect(administration.employeesList).toContain(employee)
    })

    it('removeEmployee should remove an employee', () => {
        const employee = {
            name: 'Employee 1',
            position: 'Admin',
            salary: 4000,
            duties: ['Admin Management'],
        }
        administration.employeesList = [employee]
        administration.removeEmployee(employee)
        expect(administration.employeesList).not.toContain(employee)
    })

    it('createNotification should return an action object', () => {
        const notification =
            administration.createNotification('Test Notification')
        expect(notification).toHaveProperty('actionsAd')
        expect(notification).toHaveProperty('events')
    })
})
