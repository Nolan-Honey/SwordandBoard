class Car{
    constructor(model,year){
        this.model=model;
        this.year=year;
    }
    details(){
        console.log('Model: '+this.model + " "+ this.year)
    }
}

class Sedan extends Car{
    constructor(model,year, amt){
        super(model,year);
        this.amt=amt;
    }
    info(){
        console.log(this.model + " has a balance of $"+ this.amt+".00")
    }
}

const car2= new Car('Pontiac Firebird',1976);
const sedan= new Sedan('Volvo SD',2018, 30000);
car2.details();
sedan.info();