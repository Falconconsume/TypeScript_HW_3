interface ITogetherSignutare {
    [key: string]: string | number;
}

interface IFunctionSignuture {
    [key:string]: (...arg: any[]) => any;
}

type ValueObj = {
    name: string,
    surname: string,
}

interface IObjLikeArray {
    [key: string]: ValueObj;
}

interface ICertainProperty {
    name: string;
    [key: string]: string;
} 

interface IFirstInterface {
    [key:string] : ISecondInterface;
}

interface ISecondInterface {
    surname: string;
    age: number;
}

type CheckKey = {
    [key:string]: number;
}

let grades: CheckKey = {
    Oleg:98,
    Hanna: 78,
    Olena: 100,
}

function checkGrades(grades: CheckKey): boolean {
    for(let grade in grades) {
        if(typeof grades[grade] !== 'number') {
            return false;
        }
    }
    return true;
}

console.log(checkGrades(grades));