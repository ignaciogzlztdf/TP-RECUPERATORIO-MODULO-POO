"use strict";
exports.__esModule = true;
exports.VehicleDealership = void 0;
var VehicleDealership = /** @class */ (function () {
    function VehicleDealership(principalBranchTolhuin, branchUSH, branchRG) {
        this.name = "TdF-Car";
        this.principalBranchTolhuin = principalBranchTolhuin;
        this.branchUSH = branchUSH;
        this.branchRG = branchRG;
        this.wantToSeeVehicles = false;
        this.wantToExit = false;
    }
    // getters & setters
    VehicleDealership.prototype.getName = function () {
        return this.name;
    };
    VehicleDealership.prototype.setName = function (name) {
        this.name = name;
    };
    VehicleDealership.prototype.getReadline = function () {
        var readline = require("readline-sync");
        return readline;
    };
    VehicleDealership.prototype.welcome = function (branchOffice) {
        console.log("\n\n¡Welcome to the TdF-Car Vehicle Dealership's system!");
        console.log("You are in ".concat(branchOffice.getCity(), "'s branch."));
    };
    VehicleDealership.prototype.exitSystem = function () {
        console.log("\n* You left the TdF-Car's system *");
    };
    VehicleDealership.prototype.showVehiclesInBranch = function (branchOffice) {
        console.log("\n<> ".concat(branchOffice.getVehicles().length, " Vehicles in ").concat(branchOffice.getCity(), "'s branch <>"));
        branchOffice.showVehicles();
    };
    VehicleDealership.prototype.showVehiclesInAllBranches = function () {
        console.log("\n<> ".concat(this.principalBranchTolhuin.getVehicles().length, " Vehicles in Tolhuin's branch <>"));
        this.principalBranchTolhuin.showVehicles();
        console.log("\n<> ".concat(this.branchUSH.getVehicles().length, " Vehicles in Ushuaia's branch <>"));
        this.branchUSH.showVehicles();
        console.log("\n<> ".concat(this.branchRG.getVehicles().length, " Vehicles in Rio Grande's branch <>"));
        this.branchRG.showVehicles();
    };
    VehicleDealership.prototype.searchVehiclesInBranch = function (branchOffice) {
        // branchOffice.searchVehicles();
        console.log("");
        branchOffice.getVehicles().forEach(function (vehicle) {
            console.log(vehicle.toString());
        });
        this.chooseAttributeSearchType(branchOffice.getVehicles());
    };
    VehicleDealership.prototype.requestInputForSearch = function (inputForSearch, attribute, pattern) {
        // I use a loop to prevent the user from entering an empty string or anything
        // other than a letter, it will only exit the loop when a letter is entered
        while (!inputForSearch.match(pattern) || inputForSearch.trim().length === 0) {
            inputForSearch = this.getReadline().question("\nEnter " + attribute + " to search: ");
            if (!inputForSearch.match(pattern) || inputForSearch.trim().length === 0) {
                console.log("\nPlease, enter a valid value for this search.");
            }
        }
        return inputForSearch;
    };
    VehicleDealership.prototype.individualAttributeSearch = function (vehicles, inputAttribute, attributesToSearch, inputForSearch, valuesToSearch, searchResult, patternOnlyLetters, patternOnlyNumbers, patternOnlyLettersAndNumbers) {
        do {
            inputAttribute = this.getReadline().question("\n<> Select an attribute to search by <> \n[1] Brand \n[2] Model \n[3] Category \n[4] Wear Level \n\nYour selection is: ");
            switch (inputAttribute) {
                case "1":
                    attributesToSearch.push("brand");
                    valuesToSearch.push(this.requestInputForSearch(inputForSearch, "brand", patternOnlyLetters));
                    break;
                case "2":
                    attributesToSearch.push("model");
                    valuesToSearch.push(this.requestInputForSearch(inputForSearch, "model", patternOnlyLettersAndNumbers));
                    break;
                case "3":
                    attributesToSearch.push("category");
                    valuesToSearch.push(this.requestInputForSearch(inputForSearch, "category", patternOnlyLetters));
                    break;
                case "4":
                    attributesToSearch.push("wearLevel");
                    valuesToSearch.push(parseInt(this.requestInputForSearch(inputForSearch, "wear level", patternOnlyNumbers)));
                    break;
                default:
                    console.log("\nPlease, enter a valid option.");
                    break;
            }
        } while (inputAttribute !== "1" && inputAttribute !== "2" && inputAttribute !== "3" && inputAttribute !== "4");
        for (var _i = 0, vehicles_1 = vehicles; _i < vehicles_1.length; _i++) {
            var vehicle = vehicles_1[_i];
            var match = true;
            for (var i = 0; i < attributesToSearch.length; i++) {
                if (attributesToSearch[i] === "wearLevel") {
                    if (!vehicle[attributesToSearch[i]].toString().startsWith(valuesToSearch[i])) {
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
        }
        else {
            switch (searchResult.length) {
                case 1:
                    console.log("\n<> Results <>");
                    console.log("1 vehicle found: ");
                    for (var _a = 0, searchResult_1 = searchResult; _a < searchResult_1.length; _a++) {
                        var vehicle = searchResult_1[_a];
                        console.log(vehicle.toString());
                    }
                    break;
                default:
                    console.log("\n<> Results <>");
                    console.log("".concat(searchResult.length, " vehicles found:"));
                    for (var _b = 0, searchResult_2 = searchResult; _b < searchResult_2.length; _b++) {
                        var vehicle = searchResult_2[_b];
                        console.log(vehicle.toString());
                    }
                    break;
            }
        }
    };
    VehicleDealership.prototype.combinedAttributeSearch = function () {
        console.log("HOLA");
    };
    VehicleDealership.prototype.chooseAttributeSearchType = function (vehicles) {
        /* Variables */
        // array with attributes to search by
        var attributesToSearch = [];
        // array with values being sought
        var valuesToSearch = [];
        // input to choose the type of search
        var inputForSearchType = "";
        // input to choose the attribute to search
        var inputAttribute = "";
        // input for the value being sought
        var inputForSearch = "";
        // pattern to allow only letters
        var patternOnlyLetters = /[a-zA-Z]/;
        // pattern to allow only numbers
        var patternOnlyNumbers = /^[0-9]+$/;
        // pattern to allow only letters and numbers
        var patternOnlyLettersAndNumbers = /^[a-zA-Z0-9]+$/;
        // array with the vehicles found in the search
        var searchResult = [];
        do {
            inputForSearchType = this.getReadline().question("\n<> Select attribute search type <> \n[1] Individual search (when searching for only one attribute) \n[2] Combined search (when searching for two or more attributes) \n\nYour selection is: ");
            if (inputForSearchType !== "1" && inputForSearchType !== "2") {
                console.log("\nPlease, enter a valid option.");
            }
        } while (inputForSearchType !== "1" && inputForSearchType !== "2");
        if (inputForSearchType === "1") {
            this.individualAttributeSearch(vehicles, inputAttribute, attributesToSearch, inputForSearch, valuesToSearch, searchResult, patternOnlyLetters, patternOnlyNumbers, patternOnlyLettersAndNumbers);
        }
        else {
            this.combinedAttributeSearch();
        }
    };
    VehicleDealership.prototype.searchVehiclesInAllBranches = function () {
        var vehiclesInAllBranches = this.branchUSH.getVehicles().concat(this.branchRG.getVehicles()).concat(this.principalBranchTolhuin.getVehicles());
        vehiclesInAllBranches.sort(function (a, b) { return a.getBrand().localeCompare(b.getBrand()); });
        // the vehicles in all branches are sorted
        console.log("");
        // logs to debug
        vehiclesInAllBranches.forEach(function (vehicle) {
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
    };
    VehicleDealership.prototype.switchToShowVehicles = function (inputNumber, branchOffice, branchOffice2, branchOffice3) {
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
    };
    VehicleDealership.prototype.switchToSearchVehicles = function (inputNumber, branchOffice, branchOffice2, branchOffice3) {
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
    };
    VehicleDealership.prototype.chooseAction = function (branchOffice) {
        var inputNumber = Number(this.getReadline().question("\n<> Select action <>" + "\n[1] See vehicles" + "\n[2] Search vehicles" + "\n[3] Exit" + "\n\nYour selection is: "));
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
    };
    VehicleDealership.prototype.chooseBranch = function (branchOffice) {
        var inputNumber = 0;
        switch (branchOffice.getCity()) {
            case "Tolhuin":
                inputNumber = Number(this.getReadline().question("\n<> Select branch <>" + "\n[1] In this branch" + "\n[2] In Ushuaia's branch" + "\n[3] In Rio Grande's branch" + "\n[4] In all branches" + "\n\nYour selection is: "));
                if (this.wantToSeeVehicles) {
                    this.switchToShowVehicles(inputNumber, branchOffice, this.branchUSH, this.branchRG);
                }
                // if the costumer is still in the system
                // and didn't choose to see all vehicles
                // means that he want to search vehicles
                // that's why here I use 'else' for the
                // search of vehicles
                // and this is the same in the other cities (cases Ushuaia and Rio Grande)
                else {
                    this.switchToSearchVehicles(inputNumber, branchOffice, this.branchUSH, this.branchRG);
                }
                break;
            case "Ushuaia":
                inputNumber = Number(this.getReadline().question("\n<> Select branch <>" + "\n[1] In this branch" + "\n[2] In Tolhuin's branch" + "\n[3] In Rio Grande's branch" + "\n[4] In all branches" + "\n\nYour selection is: "));
                if (this.wantToSeeVehicles) {
                    this.switchToShowVehicles(inputNumber, branchOffice, this.principalBranchTolhuin, this.branchRG);
                }
                else {
                    this.switchToSearchVehicles(inputNumber, branchOffice, this.principalBranchTolhuin, this.branchRG);
                }
                break;
            case "Rio Grande":
                inputNumber = Number(this.getReadline().question("\n<> Select branch <>" + "\n[1] In this branch" + "\n[2] In Tolhuin's branch" + "\n[3] In Ushuaia's branch" + "\n[4] In all branches" + "\n\nYour selection is: "));
                if (this.wantToSeeVehicles) {
                    this.switchToShowVehicles(inputNumber, branchOffice, this.principalBranchTolhuin, this.branchUSH);
                }
                else {
                    this.switchToSearchVehicles(inputNumber, branchOffice, this.principalBranchTolhuin, this.branchUSH);
                }
                break;
            default:
                break;
        }
    };
    VehicleDealership.prototype.elegir1 = function () {
        var opcion = prompt("Ingrese un número del 1 al 4 para elegir un método: ");
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
    };
    VehicleDealership.prototype.elegir2 = function () {
        var opcion = prompt("Ingrese un número del 1 al 5 para elegir un método: ");
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
    };
    VehicleDealership.prototype.ejecutar = function () {
        this.elegir1();
        this.elegir2();
    };
    VehicleDealership.prototype.iniciar = function () {
        this.ejecutar();
    };
    VehicleDealership.prototype.enterBranchSystem = function (branchOffice) {
        this.welcome(branchOffice);
        this.chooseAction(branchOffice);
        if (!this.wantToExit) {
            this.chooseBranch(branchOffice);
        }
    };
    return VehicleDealership;
}());
exports.VehicleDealership = VehicleDealership;
