// Створіть інтерфейс, який описує структуру об'єкта, що представляє калькулятор. 
//Калькулятор повинен мати методи для виконання арифметичних операцій: додавання, віднімання, множення та ділення. 
//Потім створіть функцію calculate, яка приймає об'єкт цього типу та виконує операцію і повертає результат.
;
function calculate(operation, calculator, a, b) {
    switch (operation) {
        case ('sum'):
            return calculator.sum(a, b);
        case ('subtraction'):
            return calculator.subtraction(a, b);
        case ('multiplication'):
            return calculator.multiplication(a, b);
        case ('division'):
            if (a !== 0 || b !== 0) {
                return calculator.division(a, b);
            }
            else {
                alert('We can`t divide on zero!');
                return NaN;
            }
        default:
            throw Error("Unexpected operation ".concat(operation));
    }
}
var calculator = {
    sum: function (a, b) { return a + b; },
    subtraction: function (a, b) { return a - b; },
    multiplication: function (a, b) { return a * b; },
    division: function (a, b) { return a / b; },
};
console.log(calculate('sum', calculator, 5, 8));
var bookService = {
    showBook: function (title, author, pages, dateOfPublication, genre) {
        console.log("Title of book: ".concat(title, "\n Author of book: ").concat(author, " \n Quantity of pages: ").concat(pages, " \n Date of Publication: ").concat(dateOfPublication, " \n Genre: ").concat(genre, "."));
        return { title: title, author: author, pages: pages, dateOfPublication: dateOfPublication, genre: genre };
    },
    whatKindOfAuthor: function (name, surname, genreOfWriting, quantityOfBooks) {
        console.log("Name of author: ".concat(name, " \n Surname of author: ").concat(surname, " \n Genre of Writing: ").concat(genreOfWriting, " \n How many books have been written: ").concat(quantityOfBooks));
        return { name: name, surname: surname, genreOfWriting: genreOfWriting, quantityOfBooks: quantityOfBooks };
    }
};
