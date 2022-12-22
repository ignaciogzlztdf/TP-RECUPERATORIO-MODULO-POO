class Vehicle {
  private kilometres:number;
  private fuelType:string;
  private model:string;
  private brand:string;
  private price:number;
  private serviceUpToDate:boolean;
  private category:string;
  private wearLevel:number;

  constructor(kilometres:number,fuelType:string,model:string,brand:string,price:number,serviceUpToDate:boolean,category:string){
    this.kilometres = kilometres;
    this.fuelType = fuelType;
    this.model = model;
    this.brand = brand;
    this.price = price;
    this.serviceUpToDate = serviceUpToDate;
    this.category = category;
    this.wearLevel = 0;
  }
  // getters & setters
  private getKilometres():number{
    return this.kilometres;
  }
  public setKilometres(kilometres:number):void{
    this.kilometres = kilometres;
  }
  private getFuelType():string{
    return this.fuelType;
  }
  public setFuelType(fuelType:string):void{
    this.fuelType = fuelType;
  }
  private getModel():string{
    return this.model;
  }
  public setModel(model:string):void{
    this.model = model;
  }
  private getBrand():string{
    return this.brand;
  }
  public setBrand(brand:string):void{
    this.brand = brand;
  }
  private getPrice():number{
    return this.price;
  }
  public setPrice(price:number):void{
    this.price = price;
  }
  private getServiceUpToDate():boolean{
    return this.serviceUpToDate;
  }
  public setServiceUpToDate(serviceUpToDate:boolean):void{
    this.serviceUpToDate = serviceUpToDate;
  }
  private getCategory():string{
    return this.category;
  }
  public setCategory(category:string):void{
    this.category = category;
  }
}