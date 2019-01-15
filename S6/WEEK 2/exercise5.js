const arr = [1, 2, 3, 4];
const calculateSum = (acc, curVal) => acc + curVal;
const calculateProduct = (acc, curVal) => acc * curVal;
console.log(arr.reduce(calculateSum));
console.log(arr.reduce(calculateProduct));