function palidrom(num: number) {
    let steps = 0;

    function reversedNumber(num:number) {
        return parseInt(String(num).split('').reverse().join(''), 10);
    }

    while(num !== reversedNumber(num)) {
        num += reversedNumber(num);
        ++steps;
    }

    return {result: num, steps: steps};
} 

function swapUniqueArray(array: number[]) {
    let uniqueArray: number [][] = [];

    if(array.length === 0 ) return [[]];

    const firstElement = array[0];
    const remainingsElements = array.slice(1);

    const swapOfRemainingElements = swapUniqueArray(remainingsElements);

    swapOfRemainingElements.forEach(swapOfRemainingElements => {
        for(let i = 0; i <= swapOfRemainingElements.length; i++) {
            const swapPrefix = swapOfRemainingElements.slice(0,i);
            const swapSuffix = swapOfRemainingElements.slice(i);
            uniqueArray.push(swapPrefix.concat( [firstElement], swapSuffix));
        }
    })
    return uniqueArray;
}