
type DeepReadonly<T> = {
    readonly [key in keyof T] : T[key] extends object ? DeepReadonly<T[key]> : T[key];
}

type DeepRequireReadonly<T> = {
    readonly [key in keyof T]-? : T[key] extends object ? DeepReadonly<T[key]> : T[key];
}

type UpperCaseKeys<T> = {
    [key in keyof T as Uppercase<key & string>] : T[key];
}

type ObjectToPropertyDescriptor <T> = {
    [key in keyof T]: {
        value: T[key],
        writable: boolean,
        enumerable: boolean,
        configurable: boolean,
    }
}