"use strict";
exports.__esModule = true;
exports.Vehicle = void 0;
var Vehicle = /** @class */ (function () {
    function Vehicle(kilometres, fuelType, brand, model, yearOfProduction, price, serviceUpToDate, category) {
        this.kilometres = kilometres;
        this.fuelType = fuelType;
        this.model = model;
        this.brand = brand;
        this.yearOfProduction = yearOfProduction;
        this.price = price;
        this.serviceUpToDate = serviceUpToDate;
        this.category = category;
        this.age = 2023 - this.yearOfProduction;
        switch (this.category) {
            case "van":
                switch (this.fuelType) {
                    case "diesel":
                        this.wearLevel = (this.kilometres / this.age) / 1000;
                        this.fixedWearLevel();
                        break;
                    case "naphtha":
                        this.wearLevel = (this.kilometres / this.age) / 100;
                        this.fixedWearLevel();
                        break;
                }
                break;
            case "car":
                switch (this.serviceUpToDate) {
                    case true:
                        this.wearLevel = (this.kilometres / this.age) / 100;
                        this.fixedWearLevel();
                        break;
                    default:
                        this.wearLevel = (this.kilometres / this.age) / 10;
                        this.fixedWearLevel();
                        break;
                }
                break;
            case "motorcycle":
                if (this.serviceUpToDate === true && this.kilometres < 30000) {
                    this.wearLevel = (this.kilometres / this.age) / 1000;
                    this.fixedWearLevel();
                }
                else {
                    this.wearLevel = (this.kilometres / this.age) / 10;
                    this.fixedWearLevel();
                }
                break;
        }
    }
    // getters & setters
    Vehicle.prototype.getKilometres = function () {
        return this.kilometres;
    };
    Vehicle.prototype.setKilometres = function (kilometres) {
        this.kilometres = kilometres;
    };
    Vehicle.prototype.getFuelType = function () {
        return this.fuelType;
    };
    Vehicle.prototype.setFuelType = function (fuelType) {
        this.fuelType = fuelType;
    };
    Vehicle.prototype.getModel = function () {
        return this.model;
    };
    Vehicle.prototype.setModel = function (model) {
        this.model = model;
    };
    Vehicle.prototype.getBrand = function () {
        return this.brand;
    };
    Vehicle.prototype.setBrand = function (brand) {
        this.brand = brand;
    };
    Vehicle.prototype.getPrice = function () {
        return this.price;
    };
    Vehicle.prototype.setPrice = function (price) {
        this.price = price;
    };
    Vehicle.prototype.getServiceUpToDate = function () {
        return this.serviceUpToDate;
    };
    Vehicle.prototype.setServiceUpToDate = function (serviceUpToDate) {
        this.serviceUpToDate = serviceUpToDate;
    };
    Vehicle.prototype.getCategory = function () {
        return this.category;
    };
    Vehicle.prototype.setCategory = function (category) {
        this.category = category;
    };
    Vehicle.prototype.getWearLevel = function () {
        return this.wearLevel;
    };
    Vehicle.prototype.setWearLevel = function (wearLevel) {
        this.wearLevel = wearLevel;
    };
    Vehicle.prototype.fixedWearLevel = function () {
        if (this.wearLevel % 1 !== 0) {
            this.wearLevel = Number(this.wearLevel.toFixed(1));
        }
    };
    Vehicle.prototype.toString = function () {
        var serviceMessage;
        if (this.serviceUpToDate) {
            serviceMessage = ", the service is up to date";
        }
        else {
            serviceMessage = ", the service is not up to date";
        }
        return "This vehicle is a " + this.brand + " " + this.model + " " + this.yearOfProduction + ", a " + this.kilometres + " km " + this.category + " that uses " + this.fuelType + serviceMessage + ", the wear level is " + this.wearLevel + ". The price is $" + this.price + ".";
    };
    return Vehicle;
}());
exports.Vehicle = Vehicle;
