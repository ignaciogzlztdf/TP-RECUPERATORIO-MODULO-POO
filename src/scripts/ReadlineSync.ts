export class ReadlineSync {
  protected readline:any;
  constructor(){
    this.readline = require('readline-sync');
  }
}