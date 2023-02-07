"use strict";
exports.__esModule = true;
var VehicleDealership_1 = require("./VehicleDealership");
var Manager_1 = require("./Manager");
var BranchOffice_1 = require("./BranchOffice");
var Vehicle_1 = require("./Vehicle");
/* Instantiated classes */
// Managers
var managerBranchTolhuin = new Manager_1.Manager("Lionel", "Messi", 11111111);
var managerBranchUshuaia = new Manager_1.Manager("Emiliano", "Martínez", 22222222);
var managerBranchRioGrande = new Manager_1.Manager("Enzo", "Fernández", 33333333);
// function to create the branches with the data in ../textFiles/branchesData.txt
function generateBranchOffices() {
    var fs = require('fs');
    var textFileContent = fs.readFileSync('../textFiles/branchesData.txt', 'utf8');
    var branchesData = textFileContent.split("<>");
    // I initialize the parameters I'll use to build the branches
    var cities = [];
    var addresses = [];
    var openHours = [];
    var vehicles = [];
    for (var i = 1; i < branchesData.length; i++) {
        var branchesDataLines = branchesData[i].split("\n");
        cities.push(branchesDataLines[2].split(": ")[1].trim());
        addresses.push(branchesDataLines[3].split(": ")[1].trim());
        openHours.push(branchesDataLines[4].split(": ")[1].trim());
        var vehiclesInBranch = [];
        for (var j = 6; j < branchesDataLines.length; j += 9) {
            if (branchesDataLines[j].trim() === "- Vehicle") {
                var brand = branchesDataLines[j + 1].split(": ")[1].trim();
                var model = branchesDataLines[j + 2].split(": ")[1].trim();
                var yearOfProduction = Number(branchesDataLines[j + 3].split(": ")[1].trim());
                var kilometres = Number(branchesDataLines[j + 4].split(": ")[1].trim());
                var category = branchesDataLines[j + 5].split(": ")[1].trim().toLowerCase();
                var fuelType = branchesDataLines[j + 6].split(": ")[1].trim().toLowerCase();
                var serviceUpToDate = void 0;
                if (branchesDataLines[j + 7].split(": ")[1].trim().toLowerCase() === "yes") {
                    serviceUpToDate = true;
                }
                else {
                    serviceUpToDate = false;
                }
                var price = Number(branchesDataLines[j + 8].split(": ")[1].trim());
                var vehicle = new Vehicle_1.Vehicle(kilometres, fuelType, brand, model, yearOfProduction, price, serviceUpToDate, category);
                vehiclesInBranch.push(vehicle);
            }
        }
        vehicles.push(vehiclesInBranch);
    }
    var branchOffices = [];
    for (var i = 0; i < cities.length; i++) {
        switch (i) {
            case 0:
                branchOffices.push(new BranchOffice_1.BranchOffice(cities[i], addresses[i], openHours[i], managerBranchTolhuin, vehicles[i]));
                break;
            case 1:
                branchOffices.push(new BranchOffice_1.BranchOffice(cities[i], addresses[i], openHours[i], managerBranchUshuaia, vehicles[i]));
                break;
            case 2:
                branchOffices.push(new BranchOffice_1.BranchOffice(cities[i], addresses[i], openHours[i], managerBranchRioGrande, vehicles[i]));
                break;
        }
    }
    return branchOffices;
}
// here I assign the branches created
var branchTolhuin = generateBranchOffices()[0];
var branchUshuaia = generateBranchOffices()[1];
var branchRioGrande = generateBranchOffices()[2];
var branches = [branchTolhuin, branchUshuaia, branchRioGrande];
// Vehicle dealership
var TdFCar = new VehicleDealership_1.VehicleDealership(branches);
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
