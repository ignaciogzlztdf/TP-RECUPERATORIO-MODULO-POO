import { Manager } from "./Manager";

class BranchOffice {
  private address:string;
  private openingHours:string;
  private manager:Manager;

  constructor(address:string,openingHours:string,manager:Manager){
    this.address = address;
    this.openingHours = openingHours;
    this.manager = manager;
  }
  // getters & setters
  private getAddress():string{
    return this.address;
  }
  public setAdress(address:string):void{
    this.address = address;
  }
  private getOpeningHours():string{
    return this.openingHours;
  }
  public setOpeningHours(openingHours:string):void{
    this.openingHours = openingHours;
  }
}