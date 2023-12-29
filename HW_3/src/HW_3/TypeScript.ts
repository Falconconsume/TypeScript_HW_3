
type PayInfo = {
    balance: number,
    debit: number,
    credit: number,
    source: 'internal' | 'external',
}

type Employee = {
    name: string,
    surname: string,
    department: Department,
    hireDate: Date,
    status: 'active' | 'inactive' | 'unpaid leave',
    salary: number,
    payInfo: PayInfo,
    numberOfCard: number,
    previousInfo ? : PreviousEmployee,
}

type Domain = {
    name: string,
}

type PreviousEmployee = {
    name: string,
    surname: string,
    salary: number,
    numberOfCard: number,
}

class Department {
    name: string;
    domain: Domain;
    employees: Employee[];
    debit: number;
    credit: number;

    constructor(name: string, debit: number, credit: number, domain: Domain) {
        this.name = name;
        this.employees = [];
        this.debit = debit;
        this.credit = credit;
        this.domain = domain;
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
        this.debit += employee.salary;
    }

    removeEmployee(employee: Employee): void {
        const indexEmployee = this.employees.indexOf(employee);
        if (indexEmployee > -1) {
            this.employees.splice(indexEmployee, 1);
            this.credit += employee.salary;
        }
    }
}

class Company {
    name: string;
    departments: Department[];
    previousHired: PreviousEmployee[];
    allStaff: Employee[];

    constructor(name: string) {
        this.name = name;
        this.departments = [];
        this.previousHired = [];
        this.allStaff = [];
    }

    addDepartment(department: Department): void {
        this.departments.push(department);
    }

    hireEmployee(employee: Employee, departmentName: string): void {
        const department = this.departments.find((d) => d.name === departmentName);
        if (department) {
            department.addEmployee(employee);
            this.allStaff.push(employee);
        } else {
            throw new Error(`Department ${departmentName} doesn't exist!`);
        }
    }

    terminateEmployee(employeeName: string): void {
        const employeeIndex = this.allStaff.findIndex((e) => e.name === employeeName);
        if (employeeIndex > -1) {
            const employee = this.allStaff[employeeIndex];
            this.allStaff.splice(employeeIndex, 1);
            const previousEmployee: PreviousEmployee = {
                name: employee.name,
                surname: employee.surname,
                salary: employee.salary,
                numberOfCard: employee.numberOfCard
            }
            employee.previousInfo = previousEmployee;
            this.previousHired.push(employee);
            const department = this.departments.find((d) => d.name === employee.department.name);
            if (department) {
                const departmentEmployeeIndex = department.employees.findIndex((e) => e.name === employeeName);
                department.removeEmployee(employee);
            } else {
                throw new Error(`Employee ${employeeName} doesn't belong to any department!`);
            }
        } else {
            throw new Error(`Employee ${employeeName} doesn't exist!`);
        }
    }
}

class Accounting extends Department {
    balance: number;

    constructor(name: string, domain: Domain) {
        super(name, 0, 0, domain);
        this.balance = 0;
    }

    addToBalance(amount: number): void {
        this.balance += amount;
    }

    removeFromBalance(amount: number): void {
        this.balance -= amount;
    }

    paySalaries(): void {
        for (const employee of this.employees) {
            if (employee.status === 'active') {
                this.removeFromBalance(employee.salary);
                if (employee.payInfo.source === 'internal') {
                    employee.payInfo.credit += employee.salary;
                } else if (employee.payInfo.source === 'external') {
                    employee.payInfo.debit += employee.salary;
                }
            }
        }
    }
}