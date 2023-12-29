// Створіть інтерфейс, який описує структуру об'єкта, що представляє калькулятор. 
//Калькулятор повинен мати методи для виконання арифметичних операцій: додавання, віднімання, множення та ділення. 
//Потім створіть функцію calculate, яка приймає об'єкт цього типу та виконує операцію і повертає результат.

interface ICalculator {
    sum(a: number,b: number): number;
    subtraction(a: number, b: number): number;
    multiplication(a: number, b: number): number;
    division(a: number, b: number): number;
};

function calculate(operation:string, calculator: ICalculator, a: number, b: number): number {
    switch(operation) {
        case('sum'): 
            return calculator.sum(a,b);

        case('subtraction'):
            return calculator.subtraction(a,b);
        
        case('multiplication'):
            return calculator.multiplication(a,b);
        
        case('division'):
        if(a !== 0 || b !== 0)
        {
            return calculator.division(a,b);
        } else {
            alert('We can`t divide on zero!');
            return NaN;
        }
        default:
            throw Error(`Unexpected operation ${operation}`);
    }
}

const calculator: ICalculator = {
    sum: (a,b) => a + b,
    subtraction: (a,b) => a - b,
    multiplication: (a,b) => a * b,
    division: (a,b) => a / b,
}

console.log(calculate('sum', calculator, 5 , 8));

interface IBook {
    title: string;
    author: string;
    pages: number;
    dateOfPublication: string;
    genre: string;
}

interface IAuthor {
    name: string;
    surname: string;
    genreOfWriting: string;
    quantityOfBooks: number;
}

interface IBookService {
    showBook(title: string, author: string, pages: number, dateOfPublication: string, genre: string): IBook;
    whatKindOfAuthor(name: string, surname: string, genreOfWriting: string, quantityOfBooks: number): IAuthor;
}

const bookService: IBookService = {
    showBook(title, author, pages, dateOfPublication, genre) {
        console.log(`Title of book: ${title}\nAuthor of book: ${author}\nQuantity of pages: ${pages}\nDate of Publication: ${dateOfPublication}\nGenre: ${genre}.`);
        return { title, author, pages, dateOfPublication, genre };
    },
    whatKindOfAuthor(name, surname, genreOfWriting, quantityOfBooks) {
        console.log(`Name of author: ${name}\nSurname of author: ${surname}\nGenre of Writing: ${genreOfWriting}\nHow many books have been written: ${quantityOfBooks}`);
        return { name, surname, genreOfWriting, quantityOfBooks };
    }
};
