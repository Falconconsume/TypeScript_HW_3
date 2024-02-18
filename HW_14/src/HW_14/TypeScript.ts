interface IOrderId {
    item: string;
    quantity: number;
}

class InventorySystem {
    public checkItem(item: string): void {
        console.log(`Checking for ${item}`);
    }
}

class OrderProcessing {
    public createOrder(item: string, quantity: number): IOrderId {
        console.log(`Creating order for ${quantity} ${item}`);
        return { item, quantity };
    }

    public confirmOrder(orderId: IOrderId): void {
        console.log(`Confirming order ${orderId.item}`);
    }
}

class PaymentProcess {
    public processPayment(orderId: number, amount: number): void {
        console.log(`Processing payment for order ${orderId}, amount: ${amount}`);
    }
}

class Facade {
    private inventorySystem: InventorySystem;
    private orderProcessing: OrderProcessing;
    private paymentProcess: PaymentProcess;

    constructor() {
        this.inventorySystem = new InventorySystem();
        this.orderProcessing = new OrderProcessing();
        this.paymentProcess = new PaymentProcess();
    }

    public purchaseItem(item: string, quantity: number, amount: number): void {
        this.inventorySystem.checkItem(item);
        const orderId: IOrderId = this.orderProcessing.createOrder(item, quantity);
        this.paymentProcess.processPayment(orderId.quantity, amount);
        this.orderProcessing.confirmOrder(orderId);
        console.log(`You made a delivery for ${quantity} ${item}`);
    }
}

const itemFacade = new Facade();
itemFacade.purchaseItem('Audi', 2, 2000);
