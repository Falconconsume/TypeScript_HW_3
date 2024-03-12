export class Observable {
    private observers: IObserver[] = []

    public addObserver(observer: IObserver) {
        this.observers.push(observer)
    }

    public removeObserver(observer: IObserver) {
        this.observers = this.observers.filter((o) => o !== observer)
    }

    public notifyObservers(message: string) {
        this.observers.forEach((observer) => observer.update(message))
    }
}