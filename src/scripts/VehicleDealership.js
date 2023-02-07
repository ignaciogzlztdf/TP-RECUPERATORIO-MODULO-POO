"use strict";
exports.__esModule = true;
exports.VehicleDealership = void 0;
var VehicleDealership = /** @class */ (function () {
    function VehicleDealership(branches) {
        this.name = "TdF-Car";
        this.branches = branches;
        this.wantToSeeVehicles = false;
        this.wantToGenerateDataFile = false;
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
    VehicleDealership.prototype.getFs = function () {
        var fs = require("fs");
        return fs;
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
        console.log("\n<> ".concat(this.branches[0].getVehicles().length, " Vehicles in Tolhuin's branch <>"));
        this.branches[0].showVehicles();
        console.log("\n<> ".concat(this.branches[1].getVehicles().length, " Vehicles in Ushuaia's branch <>"));
        this.branches[1].showVehicles();
        console.log("\n<> ".concat(this.branches[2].getVehicles().length, " Vehicles in Rio Grande's branch <>"));
        this.branches[2].showVehicles();
    };
    VehicleDealership.prototype.searchVehiclesInBranch = function (branchOffice) {
        this.chooseAttributeSearchType(branchOffice.getVehicles());
    };
    VehicleDealership.prototype.requestInputForSearch = function (inputForSearch, attribute, pattern) {
        // I use a loop to prevent the user from entering an empty string or anything
        // other than the pattern, the user will only exit the loop when the value to
        // look for matches the pattern
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
                    console.log("\n<> Result <>");
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
    VehicleDealership.prototype.combinedAttributeSearch = function (vehicles, inputAttribute, attributesToSearch, inputForSearch, valuesToSearch, searchResult, patternOnlyLetters, patternOnlyNumbers, patternOnlyLettersAndNumbers) {
        do {
            inputAttribute = this.getReadline().question("\n<> Select at least 2 attributes to search by and start the search <> \n[1] Brand \n[2] Model \n[3] Category \n[4] Wear Level \n[5] Start search \n\nYour selection is: ");
            switch (inputAttribute) {
                case "1":
                    if (!attributesToSearch.includes("brand")) {
                        attributesToSearch.push("brand");
                        valuesToSearch.push(this.requestInputForSearch(inputForSearch, "brand", patternOnlyLetters));
                    }
                    else {
                        console.log("\nThis attribute has already been selected.");
                    }
                    break;
                case "2":
                    if (!attributesToSearch.includes("model")) {
                        attributesToSearch.push("model");
                        valuesToSearch.push(this.requestInputForSearch(inputForSearch, "model", patternOnlyLettersAndNumbers));
                    }
                    else {
                        console.log("\nThis attribute has already been selected.");
                    }
                    break;
                case "3":
                    if (!attributesToSearch.includes("category")) {
                        attributesToSearch.push("category");
                        valuesToSearch.push(this.requestInputForSearch(inputForSearch, "category", patternOnlyLetters));
                    }
                    else {
                        console.log("\nThis attribute has already been selected.");
                    }
                    break;
                case "4":
                    if (!attributesToSearch.includes("wearLevel")) {
                        attributesToSearch.push("wearLevel");
                        valuesToSearch.push(this.requestInputForSearch(inputForSearch, "wearLevel", patternOnlyNumbers));
                    }
                    else {
                        console.log("\nThis attribute has already been selected.");
                    }
                    break;
                case "5":
                    break;
                default:
                    console.log("\nPlease, enter a valid option.");
                    break;
            }
            if (inputAttribute === "5") {
                if (attributesToSearch.length < 2) {
                    console.log("\nBefore starting the search, you must select at least 2 attributes.");
                }
            }
        } while (inputAttribute !== "5" || attributesToSearch.length < 2);
        for (var _i = 0, vehicles_2 = vehicles; _i < vehicles_2.length; _i++) {
            var vehicle = vehicles_2[_i];
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
                    console.log("\n<> Result <>");
                    console.log("1 vehicle found: ");
                    for (var _a = 0, searchResult_3 = searchResult; _a < searchResult_3.length; _a++) {
                        var vehicle = searchResult_3[_a];
                        console.log(vehicle.toString());
                    }
                    break;
                default:
                    console.log("\n<> Results <>");
                    console.log("".concat(searchResult.length, " vehicles found:"));
                    for (var _b = 0, searchResult_4 = searchResult; _b < searchResult_4.length; _b++) {
                        var vehicle = searchResult_4[_b];
                        console.log(vehicle.toString());
                    }
                    break;
            }
        }
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
            this.combinedAttributeSearch(vehicles, inputAttribute, attributesToSearch, inputForSearch, valuesToSearch, searchResult, patternOnlyLetters, patternOnlyNumbers, patternOnlyLettersAndNumbers);
        }
    };
    VehicleDealership.prototype.searchVehiclesInAllBranches = function () {
        var vehiclesInAllBranches = this.branches[1].getVehicles().concat(this.branches[2].getVehicles()).concat(this.branches[0].getVehicles());
        vehiclesInAllBranches.sort(function (a, b) { return a.getBrand().localeCompare(b.getBrand()); });
        // the vehicles in all branches are sorted
        this.chooseAttributeSearchType(vehiclesInAllBranches);
    };
    VehicleDealership.prototype.generateDataFileOfVehiclesInBranch = function (branchOffice) {
        var filePath = "../textFiles/vehiclesData.txt";
        var vehiclesData = "<> ".concat(branchOffice.getVehicles().length, " Vehicles in ").concat(branchOffice.getCity(), "'s branch <>\n");
        branchOffice.getVehicles().forEach(function (vehicle) {
            vehiclesData += "\n- Vehicle\n";
            vehiclesData += "Brand: ".concat(vehicle.getBrand(), "\n");
            vehiclesData += "Model: ".concat(vehicle.getModel(), "\n");
            vehiclesData += "Year of production: ".concat(vehicle.getYearOfProduction(), "\n");
            vehiclesData += "Kilometres (km): ".concat(vehicle.getKilometres(), "\n");
            vehiclesData += "Category: ".concat(vehicle.getCategory(), "\n");
            vehiclesData += "Fuel type: ".concat(vehicle.getFuelType(), "\n");
            if (vehicle.getServiceUpToDate() === true) {
                vehiclesData += "Service up to date: Yes\n";
            }
            else {
                vehiclesData += "Service up to date: No\n";
            }
            vehiclesData += "Wear level: ".concat(vehicle.getWearLevel(), "\n");
            vehiclesData += "Price (ARS): ".concat(vehicle.getPrice());
        });
        if (this.getFs().existsSync(filePath)) {
            // if the file already exists,
            // the content of the file is updated
            this.getFs().writeFileSync(filePath, vehiclesData);
            console.log("\nVehicles information updated successfully in ".concat(filePath, ".\nExiting the system..."));
        }
        else {
            // if the file doesn't exist
            // the file is created and the information
            // of the vehicles is added
            this.getFs().writeFileSync(filePath, '');
            this.getFs().writeFileSync(filePath, vehiclesData);
            console.log("\nVehicles information added successfully in ".concat(filePath, ".\nExiting the system..."));
        }
    };
    VehicleDealership.prototype.generateDataFileOfVehiclesInAllBranches = function () {
        var filePath = "../textFiles/vehiclesData.txt";
        var vehiclesData = "";
        for (var i = 0; i < this.branches.length; i++) {
            if (i === 0) {
                vehiclesData += "<> ".concat(this.branches[i].getVehicles().length, " Vehicles in ").concat(this.branches[i].getCity(), "'s branch <>\n");
            }
            else {
                vehiclesData += "\n\n\n<> ".concat(this.branches[i].getVehicles().length, " Vehicles in ").concat(this.branches[i].getCity(), "'s branch <>\n");
            }
            this.branches[i].getVehicles().forEach(function (vehicle) {
                vehiclesData += "\n- Vehicle\n";
                vehiclesData += "Brand: ".concat(vehicle.getBrand(), "\n");
                vehiclesData += "Model: ".concat(vehicle.getModel(), "\n");
                vehiclesData += "Year of production: ".concat(vehicle.getYearOfProduction(), "\n");
                vehiclesData += "Kilometres (km): ".concat(vehicle.getKilometres(), "\n");
                vehiclesData += "Category: ".concat(vehicle.getCategory(), "\n");
                vehiclesData += "Fuel type: ".concat(vehicle.getFuelType(), "\n");
                if (vehicle.getServiceUpToDate() === true) {
                    vehiclesData += "Service up to date: Yes\n";
                }
                else {
                    vehiclesData += "Service up to date: No\n";
                }
                vehiclesData += "Wear level: ".concat(vehicle.getWearLevel(), "\n");
                vehiclesData += "Price (ARS): ".concat(vehicle.getPrice());
            });
        }
        if (this.getFs().existsSync(filePath)) {
            // if the file already exists,
            // the content of the file is updated
            this.getFs().writeFileSync(filePath, vehiclesData);
            console.log("\nVehicles information updated successfully in ".concat(filePath, ".\nExiting the system..."));
        }
        else {
            // if the file doesn't exist
            // the file is created and the information
            // of the vehicles is added
            this.getFs().writeFileSync(filePath, '');
            this.getFs().writeFileSync(filePath, vehiclesData);
            console.log("\nVehicles information added successfully in ".concat(filePath, ".\nExiting the system..."));
        }
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
    VehicleDealership.prototype.switchToGenerateDataFile = function (inputNumber, branchOffice, branchOffice2, branchOffice3) {
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
    };
    VehicleDealership.prototype.chooseAction = function (branchOffice) {
        var inputNumber = Number(this.getReadline().question("\n<> Select action <>" + "\n[1] See vehicles" + "\n[2] Search vehicles" + "\n[3] Generate a data file of the branch's vehicles" + "\n[4] Exit" + "\n\nYour selection is: "));
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
    };
    VehicleDealership.prototype.chooseBranch = function (branchOffice) {
        var inputNumber = 0;
        switch (branchOffice.getCity()) {
            case "Tolhuin":
                inputNumber = Number(this.getReadline().question("\n<> Select branch <>" + "\n[1] In this branch" + "\n[2] In Ushuaia's branch" + "\n[3] In Rio Grande's branch" + "\n[4] In all branches" + "\n\nYour selection is: "));
                if (this.wantToSeeVehicles) {
                    this.switchToShowVehicles(inputNumber, branchOffice, this.branches[1], this.branches[2]);
                }
                else if (this.wantToGenerateDataFile) {
                    this.switchToGenerateDataFile(inputNumber, branchOffice, this.branches[1], this.branches[2]);
                }
                else {
                    this.switchToSearchVehicles(inputNumber, branchOffice, this.branches[1], this.branches[2]);
                }
                break;
            case "Ushuaia":
                inputNumber = Number(this.getReadline().question("\n<> Select branch <>" + "\n[1] In this branch" + "\n[2] In Tolhuin's branch" + "\n[3] In Rio Grande's branch" + "\n[4] In all branches" + "\n\nYour selection is: "));
                if (this.wantToSeeVehicles) {
                    this.switchToShowVehicles(inputNumber, branchOffice, this.branches[0], this.branches[2]);
                }
                else if (this.wantToGenerateDataFile) {
                    this.switchToGenerateDataFile(inputNumber, branchOffice, this.branches[0], this.branches[2]);
                }
                else {
                    this.switchToSearchVehicles(inputNumber, branchOffice, this.branches[0], this.branches[2]);
                }
                break;
            case "Rio Grande":
                inputNumber = Number(this.getReadline().question("\n<> Select branch <>" + "\n[1] In this branch" + "\n[2] In Tolhuin's branch" + "\n[3] In Ushuaia's branch" + "\n[4] In all branches" + "\n\nYour selection is: "));
                if (this.wantToSeeVehicles) {
                    this.switchToShowVehicles(inputNumber, branchOffice, this.branches[0], this.branches[1]);
                }
                else if (this.wantToGenerateDataFile) {
                    this.switchToGenerateDataFile(inputNumber, branchOffice, this.branches[0], this.branches[1]);
                }
                else {
                    this.switchToSearchVehicles(inputNumber, branchOffice, this.branches[0], this.branches[1]);
                }
                break;
        }
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
