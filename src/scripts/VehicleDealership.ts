import { BranchOffice } from "./BranchOffice";
import { Vehicle } from "./Vehicle";

export class VehicleDealership {
  private name:string;
  private principalBranchTolhuin:BranchOffice;
  private branchUSH:BranchOffice;
  private branchRG:BranchOffice;
  private wantToSeeVehicles:boolean;
  private wantToExit:boolean;
  constructor(principalBranchTolhuin:BranchOffice,branchUSH:BranchOffice,branchRG:BranchOffice){
    this.name = "TdF-Car";
    this.principalBranchTolhuin = principalBranchTolhuin;
    this.branchUSH = branchUSH;
    this.branchRG = branchRG;
    this.wantToSeeVehicles = false;
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
    console.log(`\n<> ${this.principalBranchTolhuin.getVehicles().length} Vehicles in Tolhuin's branch <>`);
    this.principalBranchTolhuin.showVehicles();
    console.log(`\n<> ${this.branchUSH.getVehicles().length} Vehicles in Ushuaia's branch <>`);
    this.branchUSH.showVehicles();
    console.log(`\n<> ${this.branchRG.getVehicles().length} Vehicles in Rio Grande's branch <>`);
    this.branchRG.showVehicles();
  }
  private searchVehiclesInBranch(branchOffice:BranchOffice):void{
    // branchOffice.searchVehicles();
    console.log("");

    branchOffice.getVehicles().forEach(vehicle => {
      console.log(vehicle.toString());
    });
    this.chooseAttributeSearchType(branchOffice.getVehicles());
  }
  private requestInputForSearch(inputForSearch:string, attribute:string,pattern:RegExp):string{
    // I use a loop to prevent the user from entering an empty string or anything
    // other than a letter, it will only exit the loop when a letter is entered
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
          console.log("\n<> Results <>");
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
  private combinedAttributeSearch():void {
    console.log("HOLA");
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
      this.combinedAttributeSearch();
    }
  }
  private searchVehiclesInAllBranches():void {
    let vehiclesInAllBranches:Vehicle[] = this.branchUSH.getVehicles().concat(this.branchRG.getVehicles()).concat(this.principalBranchTolhuin.getVehicles());
    vehiclesInAllBranches.sort((a, b) => a.getBrand().localeCompare(b.getBrand()));
    // the vehicles in all branches are sorted
  console.log("");

    // logs to debug
    vehiclesInAllBranches.forEach(vehicle => {
      console.log(vehicle.toString());
    });

    this.chooseAttributeSearchType(vehiclesInAllBranches);


    // otra prueba
    /*
    let selectedAttributes: string[] = [];
    let searchString: string;

    console.log("\n<> Select the attributes you want to search by <>");
    console.log("[1] Brand");
    console.log("[2] Model");
    console.log("[3] Category");
    console.log("[4] Wear Level");

    do {
        let selectedOption = this.readline.question("\nEnter option number or 'done' to finish: ");
        if (selectedOption === "done") {
            break;
        } else if (selectedOption === "1") {
            selectedAttributes.push("brand");
        } else if (selectedOption === "2") {
            selectedAttributes.push("model");
        } else if (selectedOption === "3") {
            selectedAttributes.push("category");
        } else if (selectedOption === "4") {
            selectedAttributes.push("wearLevel");
        } else {
            console.log("\nInvalid option, please select a valid option or 'done' to finish.");
        }
    } while (true);

    if (selectedAttributes.length === 0) {
        console.log("No attributes selected, returning to menu...");
        return;
    }

    searchString = this.readline.question("\nEnter the search string: ");

    let results: Vehicle[] = [];

    for (let attribute of selectedAttributes) {
        for (let branch of [this.branchUSH, this.principalBranchTolhuin, this.branchRG]) {
            for (let vehicle of branch.getVehicles()) {
                if (vehicle[attribute].toLowerCase().includes(searchString.toLowerCase())) {
                    results.push(vehicle);
                }
            }
        }
    }

    if (results.length === 0) {
        console.log("No vehicles found with the specified attributes and search string.");
    } else {
      switch (results.length){
        case 1:
          console.log(`${results.length} vehicle found:`);
          for (let result of results) {
            console.log(result.toString());
          }
          break;
        default:
          console.log(`${results.length} vehicles found:`);
          for (let result of results) {
            console.log(result.toString());
          }
          break;
      }
    }*/
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
  private chooseAction(branchOffice:BranchOffice):void{
    let inputNumber:number = Number(this.getReadline().question("\n<> Select action <>"+"\n[1] See vehicles"+"\n[2] Search vehicles"+"\n[3] Exit"+"\n\nYour selection is: "));
    switch (inputNumber) {
      case 1:
        this.wantToSeeVehicles = true;
        break;
      case 2:
        // there's no need to do anything here
        break;
      case 3:
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
          this.switchToShowVehicles(inputNumber,branchOffice,this.branchUSH,this.branchRG);
        }
        // if the costumer is still in the system
        // and didn't choose to see all vehicles
        // means that he want to search vehicles
        // that's why here I use 'else' for the
        // search of vehicles
        // and this is the same in the other cities (cases Ushuaia and Rio Grande)
        else {
          this.switchToSearchVehicles(inputNumber,branchOffice,this.branchUSH,this.branchRG);
        }
        break;
      case "Ushuaia":
        inputNumber = Number(this.getReadline().question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Tolhuin's branch"+"\n[3] In Rio Grande's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
        if (this.wantToSeeVehicles) {
          this.switchToShowVehicles(inputNumber,branchOffice,this.principalBranchTolhuin,this.branchRG);
        }
        else {
          this.switchToSearchVehicles(inputNumber,branchOffice,this.principalBranchTolhuin,this.branchRG);
        }
        break;
      case "Rio Grande":
        inputNumber = Number(this.getReadline().question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Tolhuin's branch"+"\n[3] In Ushuaia's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
        if (this.wantToSeeVehicles){
          this.switchToShowVehicles(inputNumber,branchOffice,this.principalBranchTolhuin,this.branchUSH);
        }
        else {
          this.switchToSearchVehicles(inputNumber,branchOffice,this.principalBranchTolhuin,this.branchUSH);
        }
        break;
      default:
        break;
    }
  }

  private elegir1():void {
    let opcion = prompt("Ingrese un número del 1 al 4 para elegir un método: ");
    switch (opcion) {
      case "1":
          console.log("Elegiste el primer metodo");
          break;
      case "2":
          console.log("Elegiste el segundo metodo");
          break;
      case "3":
          console.log("Elegiste el tercer metodo");
          break;
      case "4":
          console.log("Elegiste el cuarto metodo");
          break;
      default:
          console.log("Opción ingresada no válida");
          break;
    }
  }
  private elegir2():void {
    let opcion = prompt("Ingrese un número del 1 al 5 para elegir un método: ");
    switch (opcion) {
      case "1":
          console.log("Elegiste el quinto metodo");
          break;
      case "2":
          console.log("Elegiste el sexto metodo");
          break;
      case "3":
          console.log("Elegiste el septimo metodo");
          break;
      case "4":
          console.log("Elegiste el octavo metodo");
          break;
      case "5":
          this.ejecutar();
          break;
      default:
          console.log("Opción ingresada no válida");
          break;
    }
  }
  private ejecutar():void {
    this.elegir1();
    this.elegir2();
  }
  public iniciar():void {
    this.ejecutar();
  }

  public enterBranchSystem(branchOffice:BranchOffice):void {
    this.welcome(branchOffice);
    this.chooseAction(branchOffice);
    if (!this.wantToExit) {
      this.chooseBranch(branchOffice);
    }
  }
}