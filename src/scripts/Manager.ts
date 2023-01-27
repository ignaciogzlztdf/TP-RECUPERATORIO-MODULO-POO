export class Manager {
  private name:string;
  private lastName:string;
  private id:number;

  constructor(name:string,lastName:string,id:number){
    this.name = name;
    this.lastName = lastName;
    this.id = id;
  }
  // getters & setters
  public getName():string{
    return this.name;
  }
  public setName(name:string):void{
    this.name = name;
  }
  public getLastName():string{
    return this.lastName;
  }
  public setLastName(lastName:string):void{
    this.lastName = lastName;
  }
  public getFullName():string{
    return this.name + " " + this.lastName;
  }
  public getId():number{
    return this.id;
  }
  public setId(id:number):void{
    this.id = id;
  }
  public toString():string{
    return "The manager is "+this.getFullName()+" and his id is "+this.id;
  }
}