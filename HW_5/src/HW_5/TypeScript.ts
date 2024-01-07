abstract class Figure {
    public readonly name: string;
    public readonly color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    abstract calculateArea(...arg: number[]): number;
}

abstract class formulaArea extends Figure {
    public readonly formulaFigure: string;

    constructor(name: string, color: string, formulaFigure: string) {
        super(name, color);
        this.formulaFigure = formulaFigure;
    }

    print(): void {
        console.log(this.formulaFigure);
    }
}

class Circle extends Figure {
    constructor() {
        super('Circle', 'black');
    }

    calculateArea(r: number): number {
        return Math.PI * r ** 2;
    }
}

class Rectangle extends formulaArea {
    constructor() {
        super('Rectangle', 'black', 'S = a * b');
    }

    calculateArea(a: number, b: number): number {
        return a * b;
    }
}

class Square extends Figure {
    constructor() {
        super('Square', 'black');
    }

    calculateArea(a: number): number {
        return a * a;
    }
}

class Triangle extends formulaArea {
    constructor() {
        super('Triangle', 'black', 'S = 1/2 * a * b');
    }

    calculateArea(a: number, b: number): number {
        return 1/2 * a * b;
    }
}
