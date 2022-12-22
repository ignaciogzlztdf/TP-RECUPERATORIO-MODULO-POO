class VehicleDealership {
  private name:string;

  constructor(){
    this.name = "TdF-Car";
  }
  // getters & setters
  private getName():string{
    return this.name;
  }
  private setName(name:string):void{
    this.name = name;
  }
}