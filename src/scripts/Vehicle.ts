export class Vehicle {
  private kilometres:number;
  private fuelType:string;
  private model:string;
  private brand:string;
  private price:number;
  private serviceUpToDate:boolean;
  private category:string;
  private yearOfProduction:number;
  private age:number;
  private wearLevel:number;

  constructor(kilometres:number,fuelType:string,brand:string,model:string,yearOfProduction:number,price:number,serviceUpToDate:boolean,category:string){
    this.kilometres = kilometres;
    this.fuelType = fuelType;
    this.model = model;
    this.brand = brand;
    this.yearOfProduction = yearOfProduction;
    this.price = price;
    this.serviceUpToDate = serviceUpToDate;
    this.category = category;
    this.age = 2023 - this.yearOfProduction;
    switch (this.category){
      case "van":
        switch (this.fuelType){
          case "diesel":
            this.wearLevel = (this.kilometres / this.age) / 1000;
            this.fixedWearLevel();
            break;
          case "naphtha":
            this.wearLevel = (this.kilometres / this.age) / 100;
            this.fixedWearLevel();
            break;
        }
        break;
      case "car":
        switch (this.serviceUpToDate){
          case true:
            this.wearLevel = (this.kilometres / this.age) / 100;
            this.fixedWearLevel();
            break;
          default:
            this.wearLevel = (this.kilometres / this.age) / 10;
            this.fixedWearLevel();
            break;
        }
        break;
      case "motorcycle":
        if (this.serviceUpToDate === true && this.kilometres < 30000){
          this.wearLevel = (this.kilometres / this.age) / 1000;
          this.fixedWearLevel();
        }
        else {
          this.wearLevel = (this.kilometres / this.age) / 10;
          this.fixedWearLevel();
        }
        break;
    }
  }
  // getters & setters
  public getKilometres():number{
    return this.kilometres;
  }
  public setKilometres(kilometres:number):void{
    this.kilometres = kilometres;
  }
  public getFuelType():string{
    return this.fuelType;
  }
  public setFuelType(fuelType:string):void{
    this.fuelType = fuelType;
  }
  public getModel():string{
    return this.model;
  }
  public setModel(model:string):void{
    this.model = model;
  }
  public getBrand():string{
    return this.brand;
  }
  public setBrand(brand:string):void{
    this.brand = brand;
  }
  public getPrice():number{
    return this.price;
  }
  public setPrice(price:number):void{
    this.price = price;
  }
  public getServiceUpToDate():boolean{
    return this.serviceUpToDate;
  }
  public setServiceUpToDate(serviceUpToDate:boolean):void{
    this.serviceUpToDate = serviceUpToDate;
  }
  public getCategory():string{
    return this.category;
  }
  public setCategory(category:string):void{
    this.category = category;
  }
  public getWearLevel():number{
    return this.wearLevel;
  }
  public setWearLevel(wearLevel:number):void{
    this.wearLevel = wearLevel;
  }
  private fixedWearLevel():void{
    if (this.wearLevel % 1 !== 0){
      this.wearLevel = Number(this.wearLevel.toFixed(1));
    }
  }
  public toString():string{
    let serviceMessage:string;
    if (this.serviceUpToDate){
      serviceMessage = ", the service is up to date";
    }
    else {
      serviceMessage = ", the service is not up to date";
    }
    return "This vehicle is a "+this.brand+" "+this.model+" "+this.yearOfProduction+", a "+this.kilometres+" km "+this.category+" that uses "+this.fuelType+serviceMessage+", the wear level is "+this.wearLevel+". The price is $"+this.price+".";
  }
}