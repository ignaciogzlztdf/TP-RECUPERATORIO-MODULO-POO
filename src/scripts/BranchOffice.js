"use strict";
exports.__esModule = true;
exports.BranchOffice = void 0;
var BranchOffice = /** @class */ (function () {
    function BranchOffice(city, address, openHours, manager, vehicles) {
        // super();
        this.city = city;
        this.address = address;
        this.openHours = openHours;
        this.manager = manager;
        this.vehicles = vehicles;
    }
    // getters & setters
    BranchOffice.prototype.getCity = function () {
        return this.city;
    };
    BranchOffice.prototype.setCity = function (city) {
        this.city = city;
    };
    BranchOffice.prototype.getAddress = function () {
        return this.address;
    };
    BranchOffice.prototype.setAddress = function (address) {
        this.address = address;
    };
    BranchOffice.prototype.getOpenHours = function () {
        return this.openHours;
    };
    BranchOffice.prototype.setOpenHours = function (openHours) {
        this.openHours = openHours;
    };
    BranchOffice.prototype.getVehicles = function () {
        this.sortVehiclesByBrand();
        return this.vehicles;
    };
    BranchOffice.prototype.setArrayVehicles = function (vehicles) {
        this.vehicles = vehicles;
    };
    BranchOffice.prototype.getManager = function () {
        return this.manager.toString();
    };
    BranchOffice.prototype.setManager = function (manager) {
        this.manager = manager;
    };
    BranchOffice.prototype.pushVehicle = function (vehicle) {
        this.vehicles.push(vehicle);
    };
    BranchOffice.prototype.sortVehiclesByBrand = function () {
        this.vehicles.sort(function (a, b) { return a.getBrand().localeCompare(b.getBrand()); });
    };
    BranchOffice.prototype.showVehicles = function () {
        this.sortVehiclesByBrand();
        this.vehicles.forEach(function (vehicle) {
            console.log(vehicle.toString());
        });
    };
    BranchOffice.prototype.searchVehicles = function () {
        console.log("");
        var brand = this.getReadline().question("Ingrese el brand a buscar: ");
        var model = this.getReadline().question("Ingrese el model a buscar: ");
        var category = this.getReadline().question("Ingrese la category a buscar: ");
        var wearLevel = this.getReadline().question("Ingrese el wearLevel a buscar: ");
        var result = this.vehicles;
        if (brand) {
            result = result.filter(function (vehicle) { return vehicle.getBrand() === brand; });
        }
        if (model) {
            result = result.filter(function (vehicle) { return vehicle.getModel() === model; });
        }
        if (category) {
            result = result.filter(function (vehicle) { return vehicle.getCategory() === category; });
        }
        if (wearLevel) {
            result = result.filter(function (vehicle) { return vehicle.getWearLevel() === parseInt(wearLevel); });
        }
        console.log(result);
    };
    BranchOffice.prototype.getReadline = function () {
        var readline = require("readline-sync");
        return readline;
    };
    return BranchOffice;
}());
exports.BranchOffice = BranchOffice;
