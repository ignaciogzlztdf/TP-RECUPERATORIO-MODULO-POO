import { BranchOffice } from "./BranchOffice";
import { Vehicle } from "./Vehicle";

export class VehicleDealership {
  private name:string;
  private branches:BranchOffice[];
  private wantToSeeVehicles:boolean;
  private wantToGenerateDataFile:boolean;
  private wantToExit:boolean;
  constructor(branches:BranchOffice[]){
    this.name = "TdF-Car";
    this.branches = branches;
    this.wantToSeeVehicles = false;
    this.wantToGenerateDataFile = false;
    this.wantToExit = false;
  }
  // getters & setters
  public getName():string{
    return this.name;
  }
  public setName(name:string):void{
    this.name = name;
  }
  private getReadline():any{
    const readline:any = require("readline-sync");
    return readline;
  }
  private getFs():any{
    const fs:any = require("fs");
    return fs;
  }
  private welcome(branchOffice:BranchOffice):void{
    console.log("\n\n¡Welcome to the TdF-Car Vehicle Dealership's system!");
    console.log(`You are in ${branchOffice.getCity()}'s branch.`);
    
  }
  private exitSystem():void{
    console.log("\n* You left the TdF-Car's system *");
  }
  private showVehiclesInBranch(branchOffice:BranchOffice):void{
    console.log(`\n<> ${branchOffice.getVehicles().length} Vehicles in ${branchOffice.getCity()}'s branch <>`);
    branchOffice.showVehicles();
  }
  private showVehiclesInAllBranches():void{
    console.log(`\n<> ${this.branches[0].getVehicles().length} Vehicles in Tolhuin's branch <>`);
    this.branches[0].showVehicles();
    console.log(`\n<> ${this.branches[1].getVehicles().length} Vehicles in Ushuaia's branch <>`);
    this.branches[1].showVehicles();
    console.log(`\n<> ${this.branches[2].getVehicles().length} Vehicles in Rio Grande's branch <>`);
    this.branches[2].showVehicles();
  }
  private searchVehiclesInBranch(branchOffice:BranchOffice):void{
    this.chooseAttributeSearchType(branchOffice.getVehicles());
  }
  private requestInputForSearch(inputForSearch:string, attribute:string,pattern:RegExp):string{
    // I use a loop to prevent the user from entering an empty string or anything
    // other than the pattern, the user will only exit the loop when the value to
    // look for matches the pattern
    while (!inputForSearch.match(pattern) || inputForSearch.trim().length === 0) {
      inputForSearch = this.getReadline().question("\nEnter "+attribute+" to search: ");
      if (!inputForSearch.match(pattern) || inputForSearch.trim().length === 0){
        console.log("\nPlease, enter a valid value for this search.");
      }
    }
    return inputForSearch;
  }
  private individualAttributeSearch(vehicles:Vehicle[],inputAttribute:string,attributesToSearch:string[],inputForSearch:string,valuesToSearch:any[],searchResult:Vehicle[],patternOnlyLetters:RegExp,patternOnlyNumbers:RegExp,patternOnlyLettersAndNumbers:RegExp):void {
    do {
      inputAttribute = this.getReadline().question("\n<> Select an attribute to search by <> \n[1] Brand \n[2] Model \n[3] Category \n[4] Wear Level \n\nYour selection is: ");
      switch (inputAttribute) {
        case "1":
          attributesToSearch.push("brand");
          valuesToSearch.push(this.requestInputForSearch(inputForSearch,"brand",patternOnlyLetters));
          break;
        case "2":
          attributesToSearch.push("model");
          valuesToSearch.push(this.requestInputForSearch(inputForSearch,"model",patternOnlyLettersAndNumbers));
          break;
        case "3":
          attributesToSearch.push("category");
          valuesToSearch.push(this.requestInputForSearch(inputForSearch,"category",patternOnlyLetters));
          break;
        case "4":
          attributesToSearch.push("wearLevel");
          valuesToSearch.push(parseInt(this.requestInputForSearch(inputForSearch,"wear level",patternOnlyNumbers)));
          break;
        default:
          console.log("\nPlease, enter a valid option.");
          break;
      }
    } while (inputAttribute !== "1" && inputAttribute !== "2" && inputAttribute !== "3" && inputAttribute !== "4");

    for (let vehicle of vehicles) {
      let match:boolean = true;
      for (let i = 0; i < attributesToSearch.length; i++) {
        if (attributesToSearch[i] === "wearLevel"){
          if (!vehicle[attributesToSearch[i]].toString().startsWith(valuesToSearch[i])){
            match = false;
            break;
          }
        }
        else if (!vehicle[attributesToSearch[i]].toLowerCase().startsWith(valuesToSearch[i].toLowerCase())) {
          match = false;
          break;
        }
      }
      if (match) {
        searchResult.push(vehicle);
      }
    }
    if (searchResult.length === 0) {
      console.log("\nNo vehicles found with the specified attributes. Exiting the system...");
    } else {
      switch (searchResult.length){
        case 1:
          console.log("\n<> Result <>");
          console.log("1 vehicle found: ");
          for (let vehicle of searchResult) {
            console.log(vehicle.toString());
          }
          break;
        default:
          console.log("\n<> Results <>");
          console.log(`${searchResult.length} vehicles found:`);
          for (let vehicle of searchResult) {
            console.log(vehicle.toString());
          }
          break;
      }
    }
  }
  private combinedAttributeSearch(vehicles:Vehicle[],inputAttribute:string,attributesToSearch:string[],inputForSearch:string,valuesToSearch:any[],searchResult:Vehicle[],patternOnlyLetters:RegExp,patternOnlyNumbers:RegExp,patternOnlyLettersAndNumbers:RegExp):void {
    do {
      inputAttribute = this.getReadline().question("\n<> Select at least 2 attributes to search by and start the search <> \n[1] Brand \n[2] Model \n[3] Category \n[4] Wear Level \n[5] Start search \n\nYour selection is: ");
      switch (inputAttribute) {
        case "1":
          if (!attributesToSearch.includes("brand")){
            attributesToSearch.push("brand");
            valuesToSearch.push(this.requestInputForSearch(inputForSearch,"brand",patternOnlyLetters));  
          } else {
            console.log("\nThis attribute has already been selected.");
          }
          break;
        case "2":
          if (!attributesToSearch.includes("model")){
            attributesToSearch.push("model");
            valuesToSearch.push(this.requestInputForSearch(inputForSearch,"model",patternOnlyLettersAndNumbers));  
          } else {
            console.log("\nThis attribute has already been selected.");
          }
          break;
        case "3":
          if (!attributesToSearch.includes("category")){
            attributesToSearch.push("category");
            valuesToSearch.push(this.requestInputForSearch(inputForSearch,"category",patternOnlyLetters));  
          } else {
            console.log("\nThis attribute has already been selected.");
          }
          break;
        case "4":
          if (!attributesToSearch.includes("wearLevel")){
            attributesToSearch.push("wearLevel");
            valuesToSearch.push(this.requestInputForSearch(inputForSearch,"wearLevel",patternOnlyNumbers));  
          } else {
            console.log("\nThis attribute has already been selected.");
          }
          break;
        case "5":
          break;
        default:
          console.log("\nPlease, enter a valid option.");
          break;
      }
      if (inputAttribute === "5"){
        if (attributesToSearch.length < 2){
          console.log("\nBefore starting the search, you must select at least 2 attributes.");
        }
      }
    } while (inputAttribute !== "5" || attributesToSearch.length < 2);
    
    for (let vehicle of vehicles) {
      let match:boolean = true;
      for (let i = 0; i < attributesToSearch.length; i++) {
        if (attributesToSearch[i] === "wearLevel"){
          if (!vehicle[attributesToSearch[i]].toString().startsWith(valuesToSearch[i])){
            match = false;
            break;
          }
        }
        else if (!vehicle[attributesToSearch[i]].toLowerCase().startsWith(valuesToSearch[i].toLowerCase())) {
          match = false;
          break;
        }
      }
      if (match) {
          searchResult.push(vehicle);
      }
    }
    if (searchResult.length === 0) {
      console.log("\nNo vehicles found with the specified attributes. Exiting the system...");
    } else {
      switch (searchResult.length){
        case 1:
          console.log("\n<> Result <>");
          console.log("1 vehicle found: ");
          for (let vehicle of searchResult) {
            console.log(vehicle.toString());
          }
          break;
        default:
          console.log("\n<> Results <>");
          console.log(`${searchResult.length} vehicles found:`);
          for (let vehicle of searchResult) {
            console.log(vehicle.toString());
          }
          break;
      }
    }
  }
  private chooseAttributeSearchType(vehicles:Vehicle[]):void {
    /* Variables */
    // array with attributes to search by
    let attributesToSearch:string[] = [];
    // array with values being sought
    let valuesToSearch:any[] = [];
    // input to choose the type of search
    let inputForSearchType:string = "";
    // input to choose the attribute to search
    let inputAttribute:string = "";
    // input for the value being sought
    let inputForSearch:string = "";
    // pattern to allow only letters
    let patternOnlyLetters:RegExp = /[a-zA-Z]/;
    // pattern to allow only numbers
    let patternOnlyNumbers:RegExp = /^[0-9]+$/;
    // pattern to allow only letters and numbers
    let patternOnlyLettersAndNumbers:RegExp = /^[a-zA-Z0-9]+$/;
    // array with the vehicles found in the search
    let searchResult:Vehicle[] = [];

    do {
      inputForSearchType = this.getReadline().question("\n<> Select attribute search type <> \n[1] Individual search (when searching for only one attribute) \n[2] Combined search (when searching for two or more attributes) \n\nYour selection is: ");
      if (inputForSearchType !== "1" && inputForSearchType !== "2"){
        console.log("\nPlease, enter a valid option.");
      }
    } while (inputForSearchType !== "1" && inputForSearchType !== "2");

    if (inputForSearchType === "1"){
      this.individualAttributeSearch(vehicles,inputAttribute,attributesToSearch,inputForSearch,valuesToSearch,searchResult,patternOnlyLetters,patternOnlyNumbers,patternOnlyLettersAndNumbers);
    } else {
      this.combinedAttributeSearch(vehicles,inputAttribute,attributesToSearch,inputForSearch,valuesToSearch,searchResult,patternOnlyLetters,patternOnlyNumbers,patternOnlyLettersAndNumbers);
    }
  }
  private searchVehiclesInAllBranches():void {
    let vehiclesInAllBranches:Vehicle[] = this.branches[1].getVehicles().concat(this.branches[2].getVehicles()).concat(this.branches[0].getVehicles());
    vehiclesInAllBranches.sort((a, b) => a.getBrand().localeCompare(b.getBrand()));
    // the vehicles in all branches are sorted

    this.chooseAttributeSearchType(vehiclesInAllBranches);
  }
  private generateDataFileOfVehiclesInBranch(branchOffice:BranchOffice):void{
    let filePath:string = "../textFiles/vehiclesData.txt";
    let vehiclesData:string = `<> ${branchOffice.getVehicles().length} Vehicles in ${branchOffice.getCity()}'s branch <>\n`;

    branchOffice.getVehicles().forEach(vehicle => {
      vehiclesData += "\n- Vehicle\n";
      vehiclesData += `Brand: ${vehicle.getBrand()}\n`;
      vehiclesData += `Model: ${vehicle.getModel()}\n`;
      vehiclesData += `Year of production: ${vehicle.getYearOfProduction()}\n`;
      vehiclesData += `Kilometres (km): ${vehicle.getKilometres()}\n`;
      vehiclesData += `Category: ${vehicle.getCategory()}\n`;
      vehiclesData += `Fuel type: ${vehicle.getFuelType()}\n`;
      if (vehicle.getServiceUpToDate() === true){
        vehiclesData += `Service up to date: Yes\n`;
      } else {
      vehiclesData += `Service up to date: No\n`;
      }
      vehiclesData += `Wear level: ${vehicle.getWearLevel()}\n`;
      vehiclesData += `Price (ARS): ${vehicle.getPrice()}`;
    });

    if (this.getFs().existsSync(filePath)) {
      // if the file already exists,
      // the content of the file is updated
      this.getFs().writeFileSync(filePath, vehiclesData);
      console.log(`\nVehicles information updated successfully in ${filePath}.\nExiting the system...`);
    } else {
      // if the file doesn't exist
      // the file is created and the information
      // of the vehicles is added
      this.getFs().writeFileSync(filePath, '');
      this.getFs().writeFileSync(filePath, vehiclesData);
      console.log(`\nVehicles information added successfully in ${filePath}.\nExiting the system...`);
    }
  }
  private generateDataFileOfVehiclesInAllBranches(){
    let filePath:string = "../textFiles/vehiclesData.txt";
    let vehiclesData:string = "";
    for (let i:number = 0; i < this.branches.length ; i++){
      if (i === 0){
      vehiclesData += `<> ${this.branches[i].getVehicles().length} Vehicles in ${this.branches[i].getCity()}'s branch <>\n`;
      } else {
      vehiclesData += `\n\n\n<> ${this.branches[i].getVehicles().length} Vehicles in ${this.branches[i].getCity()}'s branch <>\n`;
      }
      this.branches[i].getVehicles().forEach(vehicle => {
        vehiclesData += "\n- Vehicle\n";
        vehiclesData += `Brand: ${vehicle.getBrand()}\n`;
        vehiclesData += `Model: ${vehicle.getModel()}\n`;
        vehiclesData += `Year of production: ${vehicle.getYearOfProduction()}\n`;
        vehiclesData += `Kilometres (km): ${vehicle.getKilometres()}\n`;
        vehiclesData += `Category: ${vehicle.getCategory()}\n`;
        vehiclesData += `Fuel type: ${vehicle.getFuelType()}\n`;
        if (vehicle.getServiceUpToDate() === true){
          vehiclesData += `Service up to date: Yes\n`;
        } else {
        vehiclesData += `Service up to date: No\n`;
        }
        vehiclesData += `Wear level: ${vehicle.getWearLevel()}\n`;
        vehiclesData += `Price (ARS): ${vehicle.getPrice()}`;
      });
    }

    if (this.getFs().existsSync(filePath)) {
      // if the file already exists,
      // the content of the file is updated
      this.getFs().writeFileSync(filePath, vehiclesData);
      console.log(`\nVehicles information updated successfully in ${filePath}.\nExiting the system...`);
    } else {
      // if the file doesn't exist
      // the file is created and the information
      // of the vehicles is added
      this.getFs().writeFileSync(filePath, '');
      this.getFs().writeFileSync(filePath, vehiclesData);
      console.log(`\nVehicles information added successfully in ${filePath}.\nExiting the system...`);
    }
  }
  private switchToShowVehicles(inputNumber:number,branchOffice:BranchOffice,branchOffice2:BranchOffice,branchOffice3:BranchOffice):void {
    switch (inputNumber) {
      case 1:
        this.showVehiclesInBranch(branchOffice);
        break;
      case 2:
        this.showVehiclesInBranch(branchOffice2);
        break;
      case 3:
        this.showVehiclesInBranch(branchOffice3);
        break;
      case 4:
        this.showVehiclesInAllBranches();
        break;
      default:
        console.log("\nPlease, enter a valid option.");
        this.chooseBranch(branchOffice);
        break;
    }
  }
  private switchToSearchVehicles(inputNumber:number,branchOffice:BranchOffice,branchOffice2:BranchOffice,branchOffice3:BranchOffice):void{
    switch (inputNumber) {
      case 1:
        this.searchVehiclesInBranch(branchOffice);
        break;
      case 2:
        this.searchVehiclesInBranch(branchOffice2);
        break;
      case 3:
        this.searchVehiclesInBranch(branchOffice3);
        break;
      case 4:
        this.searchVehiclesInAllBranches();
        break;
      default:
        console.log("\nPlease, enter a valid option.");
        this.chooseBranch(branchOffice);
        break;
    }
  }
  private switchToGenerateDataFile(inputNumber:number,branchOffice:BranchOffice,branchOffice2:BranchOffice,branchOffice3:BranchOffice){
    switch (inputNumber) {
      case 1:
        this.generateDataFileOfVehiclesInBranch(branchOffice);
        break;
      case 2:
        this.generateDataFileOfVehiclesInBranch(branchOffice2);
        break;
      case 3:
        this.generateDataFileOfVehiclesInBranch(branchOffice3);
        break;
      case 4:
        this.generateDataFileOfVehiclesInAllBranches();
        break;
      default:
        console.log("\nPlease, enter a valid option.");
        this.chooseBranch(branchOffice);
        break;
    }
  }
  private chooseAction(branchOffice:BranchOffice):void{
    let inputNumber:number = Number(this.getReadline().question("\n<> Select action <>"+"\n[1] See vehicles"+"\n[2] Search vehicles"+"\n[3] Generate a data file of the branch's vehicles"+"\n[4] Exit"+"\n\nYour selection is: "));
    switch (inputNumber) {
      case 1:
        this.wantToSeeVehicles = true;
        break;
      case 2:
        // there's no need to do anything here
        break;
      case 3:
        this.wantToGenerateDataFile = true;
        break;
      case 4:
        this.wantToExit = true;
        this.exitSystem();
        break;
      default:
        console.log("\nPlease, enter a valid option.");
        this.chooseAction(branchOffice);
        break;
    }
  }

  private chooseBranch(branchOffice:BranchOffice):void{
    let inputNumber:number = 0;
    switch (branchOffice.getCity()) {
      case "Tolhuin":
        inputNumber = Number(this.getReadline().question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Ushuaia's branch"+"\n[3] In Rio Grande's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
        if (this.wantToSeeVehicles) {
          this.switchToShowVehicles(inputNumber,branchOffice,this.branches[1],this.branches[2]);
        }
        else if (this.wantToGenerateDataFile) {
          this.switchToGenerateDataFile(inputNumber,branchOffice,this.branches[1],this.branches[2]);
        } else {
          this.switchToSearchVehicles(inputNumber,branchOffice,this.branches[1],this.branches[2]);
        }
        break;
      case "Ushuaia":
        inputNumber = Number(this.getReadline().question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Tolhuin's branch"+"\n[3] In Rio Grande's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
        if (this.wantToSeeVehicles) {
          this.switchToShowVehicles(inputNumber,branchOffice,this.branches[0],this.branches[2]);
        }
        else if (this.wantToGenerateDataFile) {
          this.switchToGenerateDataFile(inputNumber,branchOffice,this.branches[0],this.branches[2]);
        } else {
          this.switchToSearchVehicles(inputNumber,branchOffice,this.branches[0],this.branches[2]);
        }
        break;
      case "Rio Grande":
        inputNumber = Number(this.getReadline().question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Tolhuin's branch"+"\n[3] In Ushuaia's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
        if (this.wantToSeeVehicles){
          this.switchToShowVehicles(inputNumber,branchOffice,this.branches[0],this.branches[1]);
        }
        else if (this.wantToGenerateDataFile) {
          this.switchToGenerateDataFile(inputNumber,branchOffice,this.branches[0],this.branches[1]);
        } else {
          this.switchToSearchVehicles(inputNumber,branchOffice,this.branches[0],this.branches[1]);
        }
        break;
    }
  }
  public enterBranchSystem(branchOffice:BranchOffice):void {
    this.welcome(branchOffice);
    this.chooseAction(branchOffice);
    if (!this.wantToExit) {
      this.chooseBranch(branchOffice);
    }
  }
}