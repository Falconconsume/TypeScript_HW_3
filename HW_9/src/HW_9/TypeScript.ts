type ConditionTypeReturnFunction<T> = T extends (...args: any[]) => infer P ? P : any;

type ConditionCortegType<T> = T extends (...args: infer P) => infer R ? [R, P[0]] : any;
