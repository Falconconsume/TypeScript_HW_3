export class Animals implements IAnimal {
    public name: string
    public type: string
    public age: number
    public health: 'Good' | 'Bad'

    constructor(
        name: string,
        type: string,
        age: number,
        health: 'Good' | 'Bad'
    ) {
        this.name = name
        this.type = type
        this.age = age
        this.health = health
    }
}