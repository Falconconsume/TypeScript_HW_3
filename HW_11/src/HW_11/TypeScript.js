function palidrom(num) {
    var steps = 0;
    function reversedNumber(num) {
        return parseInt(String(num).split('').reverse().join(''), 10);
    }
    while (num !== reversedNumber(num)) {
        num += reversedNumber(num);
        ++steps;
    }
    return { result: num, steps: steps };
}
function swapUniqueArray(array) {
    var uniqueArray = [];
    if (array.length === 0)
        return [[]];
    var firstElement = array[0];
    var remainingsElements = array.slice(1);
    var swapOfRemainingElements = swapUniqueArray(remainingsElements);
    swapOfRemainingElements.forEach(function (swapOfRemainingElements) {
        for (var i = 0; i <= swapOfRemainingElements.length; i++) {
            var swapPrefix = swapOfRemainingElements.slice(0, i);
            var swapSuffix = swapOfRemainingElements.slice(i);
            uniqueArray.push(swapPrefix.concat([firstElement], swapSuffix));
        }
    });
    return uniqueArray;
}
