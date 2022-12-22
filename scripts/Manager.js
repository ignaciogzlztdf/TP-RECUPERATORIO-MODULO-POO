"use strict";
exports.__esModule = true;
exports.Manager = void 0;
var Manager = /** @class */ (function () {
    function Manager(name, lastName, id) {
        this.name = name;
        this.lastName = lastName;
        this.id = id;
    }
    // getters & setters
    Manager.prototype.getName = function () {
        return this.name;
    };
    Manager.prototype.setName = function (name) {
        this.name = name;
    };
    Manager.prototype.getLastName = function () {
        return this.lastName;
    };
    Manager.prototype.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    Manager.prototype.getFullName = function () {
        return this.name + " " + this.lastName;
    };
    Manager.prototype.getId = function () {
        return this.id;
    };
    Manager.prototype.setId = function (id) {
        this.id = id;
    };
    return Manager;
}());
exports.Manager = Manager;
