var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    function Department(name, debit, credit, domain) {
        this.name = name;
        this.employees = [];
        this.debit = debit;
        this.credit = credit;
        this.domain = domain;
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
        this.debit += employee.salary;
    };
    Department.prototype.removeEmployee = function (employee) {
        var indexEmployee = this.employees.indexOf(employee);
        if (indexEmployee > -1) {
            this.employees.splice(indexEmployee, 1);
            this.credit += employee.salary;
        }
    };
    return Department;
}());
var Company = /** @class */ (function () {
    function Company(name) {
        this.name = name;
        this.departments = [];
        this.previousHired = [];
        this.allStaff = [];
    }
    Company.prototype.addDepartment = function (department) {
        this.departments.push(department);
    };
    Company.prototype.hireEmployee = function (employee, departmentName) {
        var department = this.departments.find(function (d) { return d.name === departmentName; });
        if (department) {
            department.addEmployee(employee);
            this.allStaff.push(employee);
        }
        else {
            throw new Error("Department ".concat(departmentName, " doesn't exist!"));
        }
    };
    Company.prototype.terminateEmployee = function (employeeName) {
        var employeeIndex = this.allStaff.findIndex(function (e) { return e.name === employeeName; });
        if (employeeIndex > -1) {
            var employee_1 = this.allStaff[employeeIndex];
            this.allStaff.splice(employeeIndex, 1);
            var previousEmployee = {
                name: employee_1.name,
                surname: employee_1.surname,
                salary: employee_1.salary,
                numberOfCard: employee_1.numberOfCard,
            };
            employee_1.previousInfo = previousEmployee;
            this.previousHired.push(employee_1);
            var department = this.departments.find(function (d) { return d.name === employee_1.department.name; });
            if (department) {
                var departmentEmployeeIndex = department.employees.findIndex(function (e) { return e.name === employeeName; });
                department.removeEmployee(employee_1);
            }
            else {
                throw new Error("Employee ".concat(employeeName, " doesn't belong to any department!"));
            }
        }
        else {
            throw new Error("Employee ".concat(employeeName, " doesn't exist!"));
        }
    };
    return Company;
}());
var Accounting = /** @class */ (function (_super) {
    __extends(Accounting, _super);
    function Accounting(name, domain) {
        var _this = _super.call(this, name, 0, 0, domain) || this;
        _this.balance = 0;
        return _this;
    }
    Accounting.prototype.addToBalance = function (amount) {
        this.balance += amount;
    };
    Accounting.prototype.removeFromBalance = function (amount) {
        this.balance -= amount;
    };
    Accounting.prototype.paySalaries = function () {
        for (var _i = 0, _a = this.employees; _i < _a.length; _i++) {
            var employee = _a[_i];
            if (employee.status === 'active') {
                this.removeFromBalance(employee.salary);
                if (employee.payInfo.source === 'internal') {
                    employee.payInfo.credit += employee.salary;
                }
                else if (employee.payInfo.source === 'external') {
                    employee.payInfo.debit += employee.salary;
                }
            }
        }
    };
    return Accounting;
}(Department));
