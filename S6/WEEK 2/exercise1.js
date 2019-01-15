const gretter=(myArray)=>{
    const greetText='Hello';
    for (let index in myArray){
         console.log(greetText + " " +myArray[index])
    };
};
gretter(['Randy Savage','Ric Falir','Hulk Hogan'])