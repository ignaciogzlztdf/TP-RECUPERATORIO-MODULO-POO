"use strict";
exports.__esModule = true;
var Manager_1 = require("./Manager");
var manager = new Manager_1.Manager("Ignacio", "González", 45877620);
console.log(manager.getFullName());
manager.setName("Juan");
console.log(manager.getFullName());
