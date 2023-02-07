"use strict";
exports.__esModule = true;
exports.BranchOffice = void 0;
var BranchOffice = /** @class */ (function () {
    function BranchOffice(city, address, openHours, manager, vehicles) {
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
    return BranchOffice;
}());
exports.BranchOffice = BranchOffice;
