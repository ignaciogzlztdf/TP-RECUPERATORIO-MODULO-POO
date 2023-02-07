import { Manager } from "./Manager";
import { Vehicle } from "./Vehicle";


export class BranchOffice {
  private city:string;
  private address:string;
  private openHours:string;
  private manager:Manager;
  private vehicles:Vehicle[];

  constructor(city:string,address:string,openHours:string,manager:Manager,vehicles:Vehicle[]){
    this.city = city;
    this.address = address;
    this.openHours = openHours;
    this.manager = manager;
    this.vehicles = vehicles;
  }
  // getters & setters
  public getCity():string{
    return this.city;
  }
  public setCity(city:string):void{
    this.city = city;
  }
  public getAddress():string{
    return this.address;
  }
  public setAddress(address:string):void{
    this.address = address;
  }
  public getOpenHours():string{
    return this.openHours;
  }
  public setOpenHours(openHours:string):void{
    this.openHours = openHours;
  }
  public getVehicles():Vehicle[]{
    this.sortVehiclesByBrand();
    return this.vehicles;
  }
  public setArrayVehicles(vehicles:Vehicle[]):void{
    this.vehicles = vehicles;
  }
  public getManager():string{
    return this.manager.toString();
  }
  public setManager(manager:Manager):void{
    this.manager = manager;
  }
  public pushVehicle(vehicle:Vehicle):void{
    this.vehicles.push(vehicle);
  }
  private sortVehiclesByBrand():void{
    this.vehicles.sort((a, b) => a.getBrand().localeCompare(b.getBrand()));
  }
  public showVehicles():void{
    this.sortVehiclesByBrand();
    this.vehicles.forEach(vehicle => {
      console.log(vehicle.toString());
    });
  }
}