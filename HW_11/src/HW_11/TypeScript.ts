function palidrom(num: number) {
    let steps: number = 0;
    let maxSteps: number = 1000;

    function reversedNumber(num:number) {
        return parseInt(String(num).split('').reverse().join(''), 10);
    }

    while(num !== reversedNumber(num)) {
        num += reversedNumber(num);
        ++steps;
        if(steps === maxSteps) return { message: 'The number hasn\'t got a palindrome' };
    }
    
    return { result: num, steps: steps };
} 

console.log(palidrom(193));

function swapUniqueArray(array: number[]) {
    let uniqueArray: number[][] = [];

    if (array.length === 0) return [[]];

    const firstElement = array[0];
    const remainingsElements = array.slice(1);

    const swapOfRemainingElements = swapUniqueArray(remainingsElements);

    swapOfRemainingElements.forEach(swapOfRemainingElements => {
        for (let i = 0; i <= swapOfRemainingElements.length; i++) {
            const swapPrefix = swapOfRemainingElements.slice(0, i);
            const swapSuffix = swapOfRemainingElements.slice(i);
            uniqueArray.push(swapPrefix.concat([firstElement], swapSuffix));
        }
    })
    return uniqueArray;
}

let arr = [1, 2, 3];
console.log(swapUniqueArray(arr));

