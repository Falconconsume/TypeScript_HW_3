function DeprecatedMethod(reason: string, nameOfNewMethod?: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.warn(`${propertyKey} can't be used.${reason}`);
        if(nameOfNewMethod) {
            console.warn(`You can use this method ${nameOfNewMethod} instead!`);
        }
        return descriptor;
    }
}

function MinLength(minNumber: number) {
    return function( target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalDecorator = descriptor.value;
        descriptor.value = function(...args: any[]) {
            if(args[0].length < minNumber) {
                throw Error('You should enter more letters!');
            }
            return originalDecorator.apply(this, args);
        }
        return descriptor;
    }
}

function MaxLength(maxNumber: number) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalDecorator = descriptor.value;
        descriptor.value = function(...args: any[]) {
            if(args[0].length  >  maxNumber) {
                throw Error('You can\'t enter anything anymore!');
            }
            return originalDecorator.apply(this, args);
        }
        return descriptor;
    }
}

function Email(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalDecorator = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if(!args[0].includes('@') || !args[0].includes('.')) {
                throw Error(`You entered invalid email!`);
            }
            return originalDecorator.apply(this, args)
        }
        return descriptor;
}


class UserCheck {
    @Email
    @MinLength(5)
    @MaxLength(50)
    setEmail(email: string) {
        console.log(`Your ${email} is valid.`);
    }
}
