import { Manager } from "./Manager";
import { ReadlineSync } from "./ReadlineSync";
import { Vehicle } from "./Vehicle";

export class BranchOffice extends ReadlineSync{
  private city:string;
  private address:string;
  private openHours:string;
  private manager:Manager;
  private vehicles:Vehicle[];

  constructor(city:string,address:string,openHours:string,manager:Manager,vehicles:Vehicle[]){
    super();
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
  

  public searchVehicles():void{
    console.log("");
    const brand = this.readline.question("Ingrese el brand a buscar: ");
    const model = this.readline.question("Ingrese el model a buscar: ");
    const category = this.readline.question("Ingrese la category a buscar: ");
    const wearLevel = this.readline.question("Ingrese el wearLevel a buscar: ");
    let result = this.vehicles;

    if (brand) {
      result = result.filter(vehicle => vehicle.getBrand() === brand);
    }
    if (model) {
      result = result.filter(vehicle => vehicle.getModel() === model);
    }
    if (category) {
      result = result.filter(vehicle => vehicle.getCategory() === category);
    }
    if (wearLevel) {
      result = result.filter(vehicle => vehicle.getWearLevel() === parseInt(wearLevel));
    }
    console.log(result);
  }
}