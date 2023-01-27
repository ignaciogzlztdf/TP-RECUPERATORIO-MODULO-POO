import { BranchOffice } from "./BranchOffice";
import { ReadlineSync } from "./ReadlineSync";
import { Vehicle } from "./Vehicle";

export class VehicleDealership extends ReadlineSync {
  private name:string;
  private principalBranchTolhuin:BranchOffice;
  private branchUSH:BranchOffice;
  private branchRG:BranchOffice;
  private wantToSeeVehicles:boolean;
  private wantToExit:boolean;
  constructor(principalBranchTolhuin:BranchOffice,branchUSH:BranchOffice,branchRG:BranchOffice){
    super();
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
  private welcome():void{
    console.log("\n¡Welcome to the TdF-Car Vehicle Dealership's system!"+"\n");
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
    branchOffice.searchVehicles();
  }
  private requestInputForSearch(inputForSearch:string, attribute:string,pattern:RegExp):string{
    // I use a loop to prevent the user from entering an empty string or anything
    // other than a letter, it will only exit the loop when a letter is entered
    while (!inputForSearch.match(pattern) || inputForSearch.trim().length === 0) {
      inputForSearch = this.readline.question("\nEnter "+attribute+" to search: ");
      if (!inputForSearch.match(pattern) || inputForSearch.trim().length === 0){
        console.log("\nPlease enter a valid value for this search.");
      }
    }
    return inputForSearch;
  }
  private searchVehiclesInAllBranches():void{
    let vehiclesInAllBranches:Vehicle[] = this.branchUSH.getVehicles().concat(this.branchRG.getVehicles()).concat(this.principalBranchTolhuin.getVehicles());
    vehiclesInAllBranches.sort((a, b) => a.getBrand().localeCompare(b.getBrand()));
    // the array is sorted

    vehiclesInAllBranches.forEach(vehicle => {
      console.log(vehicle.toString());
    });

    let attributesToSearch:string[] = [];
    let valueToSearch:any[] = [];
    let inputAttribute:string;
    let inputForSearch:string = "";
    let patternOnlyLetters:RegExp = /[a-zA-Z]/;
    let patternOnlyLettersAndNumbers:RegExp = /^[a-zA-Z0-9]+$/;
    let patternOnlyNumbers:RegExp = /^[0-9]+$/;
    let searchResult:Vehicle[] = [];

    do {
        inputAttribute = this.readline.question("\n<> Select attributes to search by <> \n[1] Brand \n[2] Model \n[3] Category \n[4] Wear Level \n\nYour selection is: ");
        switch (inputAttribute) {
          case "1":
              attributesToSearch.push("brand");
              valueToSearch.push(this.requestInputForSearch(inputForSearch,"brand",patternOnlyLetters));
              break;
          case "2":
              attributesToSearch.push("model");
              valueToSearch.push(this.requestInputForSearch(inputForSearch,"model",patternOnlyLettersAndNumbers));
              break;
          case "3":
              attributesToSearch.push("category");
              valueToSearch.push(this.requestInputForSearch(inputForSearch,"category",patternOnlyLetters));
              break;
          case "4":
              attributesToSearch.push("wearLevel");
              valueToSearch.push(parseInt(this.requestInputForSearch(inputForSearch,"wear level",patternOnlyNumbers)));

              break;
          default:
              console.log("\nInvalid option selected.");
              break;
      }
    } while (inputAttribute !== "1" && inputAttribute !== "2" && inputAttribute !== "3" && inputAttribute !== "4");

    for (let vehicle of vehiclesInAllBranches) {
      let match:boolean = true;
      for (let i = 0; i < attributesToSearch.length; i++) {
        if (attributesToSearch[i] === "wearLevel"){
          if (!vehicle[attributesToSearch[i]].toString().startsWith(valueToSearch[i])){
            match = false;
            break;  
          }
        }
        else if (!vehicle[attributesToSearch[i]].toLowerCase().startsWith(valueToSearch[i])) {
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


      // copy
    //     console.log("\nResults: ");
    //     for (let vehicle of result) {
    //         console.log(vehicle.toString());
    //     }
    // }

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
        console.log("\nPlease enter a valid number."+"\n");
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
        console.log("\nPlease enter a valid number."+"\n");
        this.chooseBranch(branchOffice);
        break;
    }
  }
  private chooseAction(branchOffice:BranchOffice):void{
    let ACTUAL_BRANCH:string = branchOffice.getCity()+"'s branch";
    let inputNumber:number = Number(this.readline.question("<> "+ACTUAL_BRANCH+" <>"+"\n[1] See vehicles"+"\n[2] Search vehicles"+"\n[3] Exit"+"\n\nYour selection is: "));
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
        console.log("\nPlease enter a valid number.\n");
        this.chooseAction(branchOffice);
        break;
    }
  }

  private chooseBranch(branchOffice:BranchOffice):void{
    let inputNumber:number = 0;
    switch (branchOffice.getCity()) {
      case "Tolhuin":
        inputNumber = Number(this.readline.question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Ushuaia's branch"+"\n[3] In Rio Grande's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
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
        inputNumber = Number(this.readline.question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Tolhuin's branch"+"\n[3] In Rio Grande's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
        if (this.wantToSeeVehicles) {
          this.switchToShowVehicles(inputNumber,branchOffice,this.principalBranchTolhuin,this.branchRG);
        }
        else {
          this.switchToSearchVehicles(inputNumber,branchOffice,this.principalBranchTolhuin,this.branchRG);
        }
        break;
      case "Rio Grande":
        inputNumber = Number(this.readline.question("\n<> Select branch <>"+"\n[1] In this branch"+"\n[2] In Tolhuin's branch"+"\n[3] In Ushuaia's branch"+"\n[4] In all branches"+"\n\nYour selection is: "));
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
    this.welcome();
    this.chooseAction(branchOffice);
    if (!this.wantToExit) {
      this.chooseBranch(branchOffice);
    }
  }
}