//EXERCISE2
const capitalize=([first,...rest])=>first.toUpperCase()+rest.join('').toLowerCase();
console.log(capitalize('fooBar'))

//EXERCISE3

var arr=['blue','red','yellow','orange']
const capitalizedColors=(arr)=>arr.map(capitalize);
console.log(capitalizedColors(arr))