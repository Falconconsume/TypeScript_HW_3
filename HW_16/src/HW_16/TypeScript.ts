
interface IInterface {
    name: string;
    surname: string;
}

type SomeType = {
    name: string,
    surname: string,
}
// 
interface IFunctionExpression {
    func: (arg: IInterface) => void;
}

type TypeFunctionExpression = {
    func: (arg: SomeType) => void;
}
// 
type TypeForPrimitiveType = string | number;
type Tuple = [string, boolean];
type Together = SomeType | IInterface;
// 
interface IExtendedInterface extends IInterface {
    age: number;
}

type BaseType = {
    name: string;
}

interface ExtendedInterfaceType extends BaseType{
    surname: string;
}

type ExtendedType = SomeType & {
    age: number;
}

type ExtendedInterface = IInterface & {
    age:number;
}
// 
class ClassWithInterface implements IExtendedInterface {
    name: string;
    surname: string;
    age: number;

    constructor() {
        this.name = 'SomeName';
        this.surname = 'SomeSurname';
        this.age = 12
    }
}

type UnionType = string | number

class ClassWithType {
    info: UnionType;

    constructor(info: string | number) {
        this.info = info as UnionType
    }
}

interface IInteger {
    a: number;
}

interface IInteger {
    b: number;
}

const listIntegers: IInteger = {
    a:2,
    b:3
}