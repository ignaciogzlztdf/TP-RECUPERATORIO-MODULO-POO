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
  private getName():string{
    return this.name;
  }
  public setName(name:string):void{
    this.name = name;
  }
  private getLastName():string{
    return this.lastName;
  }
  private setLastName(lastName:string):void{
    this.lastName = lastName;
  }
  public getFullName():string{
    return this.name + " " + this.lastName;
  }
  private getId():number{
    return this.id;
  }
  private setId(id:number):void{
    this.id = id;
  }
}