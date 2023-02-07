import { VehicleDealership } from "./VehicleDealership";
import { Manager } from "./Manager";
import { BranchOffice } from "./BranchOffice";
import { Vehicle } from "./Vehicle";


/* Instantiated classes */

// Managers
let managerBranchTolhuin:Manager = new Manager("Lionel","Messi",11111111);
let managerBranchUshuaia:Manager = new Manager("Emiliano","Martínez",22222222);
let managerBranchRioGrande:Manager = new Manager("Enzo","Fernández",33333333);

// function to create the branches with the data in ../textFiles/branchesData.txt
function generateBranchOffices():BranchOffice[] {
  let fs:any = require('fs');
  let textFileContent:string = fs.readFileSync('../textFiles/branchesData.txt', 'utf8');
  let branchesData:string[] = textFileContent.split("<>");

  // I initialize the parameters I'll use to build the branches
  let cities:string[] = [];
  let addresses:string[] = [];
  let openHours:string[] = [];
  let vehicles:Vehicle[][] = [];

  for (let i:number = 1; i < branchesData.length; i++){
    let branchesDataLines:string[] = branchesData[i].split("\n");
    cities.push(branchesDataLines[2].split(": ")[1].trim());
    addresses.push(branchesDataLines[3].split(": ")[1].trim());
    openHours.push(branchesDataLines[4].split(": ")[1].trim());

    let vehiclesInBranch:Vehicle[] = [];
    for (let j = 6; j < branchesDataLines.length; j += 9 ){
      if (branchesDataLines[j].trim() === "- Vehicle"){
        let brand:string = branchesDataLines[j + 1].split(": ")[1].trim();
        let model:string = branchesDataLines[j + 2].split(": ")[1].trim();
        let yearOfProduction:number = Number(branchesDataLines[j + 3].split(": ")[1].trim());
        let kilometres:number = Number(branchesDataLines[j + 4].split(": ")[1].trim());
        let category:string = branchesDataLines[j + 5].split(": ")[1].trim().toLowerCase();
        let fuelType:string = branchesDataLines[j + 6].split(": ")[1].trim().toLowerCase();
        let serviceUpToDate:boolean;
        if (branchesDataLines[j + 7].split(": ")[1].trim().toLowerCase() === "yes"){
          serviceUpToDate = true;
        } else {
          serviceUpToDate = false;
        }
        let price:number = Number(branchesDataLines[j + 8].split(": ")[1].trim());

        let vehicle:Vehicle = new Vehicle(kilometres,fuelType,brand,model,yearOfProduction,price,serviceUpToDate,category);
        vehiclesInBranch.push(vehicle);
      }
    }
    vehicles.push(vehiclesInBranch);
  }

  let branchOffices: BranchOffice[] = [];

  for (let i :number = 0; i < cities.length; i++){
    switch (i){
      case 0:
        branchOffices.push(new BranchOffice(cities[i],addresses[i],openHours[i],managerBranchTolhuin,vehicles[i]));
        break;
      case 1:
        branchOffices.push(new BranchOffice(cities[i],addresses[i],openHours[i],managerBranchUshuaia,vehicles[i]));
        break;
      case 2:
        branchOffices.push(new BranchOffice(cities[i],addresses[i],openHours[i],managerBranchRioGrande,vehicles[i]));
        break;
    }
  }
  return branchOffices;
}

// here I assign the branches created
let branchTolhuin:BranchOffice = generateBranchOffices()[0];
let branchUshuaia:BranchOffice = generateBranchOffices()[1];
let branchRioGrande:BranchOffice = generateBranchOffices()[2];

let branches:BranchOffice[] = [branchTolhuin,branchUshuaia,branchRioGrande];

// Vehicle dealership
let TdFCar:VehicleDealership = new VehicleDealership(branches);


// I run the Vehicle Dealership's System
TdFCar.enterBranchSystem(branchTolhuin);


// Notes:
// The system doesn't provide the function to buy a vehicle yet,
// but I will add that function after submitting this project.
// 
// When searching for a vehicle with a wear level that is a 
// non-integer number (for example, 1.4) the search doesn't
// work, the only way to search for that wear level is entering
// the integer part of the number (for example 1), this will
// find your sought number, as well as every other wear level
// including that number.
// 
// Reading documentation I've learned that the default option
// in a switch sentence is optional, so now I can delete the
// empty default options I left inside the code xD.
// 
// I would like to add a go back function to improve the
// user experience when interacting with the program.