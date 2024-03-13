import { Animals } from '../classes/Animals'

describe('Add atributes for the animal', () => {
    let animals: Animals

    beforeEach(() => {
        animals = new Animals('Leo', 'Lion', 5, 'Good')
    })

    it('Animal attributes should be set correctly', () => {
        expect(animals.name).toBe('Leo')
        expect(animals.type).toBe('Lion')
        expect(animals.age).toBe(5)
        expect(animals.health).toBe('Good')
    })
})
