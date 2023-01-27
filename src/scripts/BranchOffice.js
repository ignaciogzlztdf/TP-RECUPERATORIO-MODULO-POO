"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BranchOffice = void 0;
var ReadlineSync_1 = require("./ReadlineSync");
var BranchOffice = /** @class */ (function (_super) {
    __extends(BranchOffice, _super);
    function BranchOffice(city, address, openHours, manager, vehicles) {
        var _this = _super.call(this) || this;
        _this.city = city;
        _this.address = address;
        _this.openHours = openHours;
        _this.manager = manager;
        _this.vehicles = vehicles;
        return _this;
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
        var brand = this.readline.question("Ingrese el brand a buscar: ");
        var model = this.readline.question("Ingrese el model a buscar: ");
        var category = this.readline.question("Ingrese la category a buscar: ");
        var wearLevel = this.readline.question("Ingrese el wearLevel a buscar: ");
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
    return BranchOffice;
}(ReadlineSync_1.ReadlineSync));
exports.BranchOffice = BranchOffice;
