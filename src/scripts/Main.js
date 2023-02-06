"use strict";
/* Consignas */
/*
Ejercicio
La concesionaria de vehículos TdF-Car solicita la
creación de un sistema para manejar el stock de
vehículos disponibles. A su vez, el sistema quedará
a disposición para que potenciales clientes puedan
ver los vehículos y decidir en su compra.

Info vehiculo
La información mínima asociada a un vehículo
es:
● kilometraje
● tipo de combustible
● modelo
● marca
● precio
● service al dia
● categoría (camioneta/auto/motocicleta)

Nivel de desgaste
Además para cada vehículo se desea conocer el
nivel de desgaste. Este factor será calculado de
forma diferente según su categoría, como se
menciona a continuación.
Camioneta:
• Si el combustible es diesel
(kilometrajes / años de antigüedad ) / 1000
• Si el combustible es nafta (con o sin GNC)
kilometrajes / años de antigüedad ) / 100

Auto:
• Si el service está al día
(kilometrajes / años de antigüedad ) / 100
• En caso contrario
(kilometrajes / años de antigüedad ) / 10

Moto:
• Si el service está al día y tiene menos de 30 mil
km
(kilometrajes / años de antigüedad ) / 1000
• En caso contrario
(kilometrajes / años de antigüedad ) / 10

Sucursales
La concesionaria está evaluando la posibilidad de abrir 2
nuevas sucursales en diferentes puntos de la Provincia
de TdF. Por lo tanto llega un requerimiento de último
momento, desea que el sistema soporte múltiples
sucursales.
Cada sucursal tendrá su dirección, horarios
de atención al público, información del gerente
responsable de dicha sucursal (nombre, apellido,
documento). El usuario del sistema podrá realizar la
búsqueda de vehículos de interés en una sucursal
específica o en todas.
Cada sucursal tendrá su catálogo de vehículos y en el
caso de que un vehículo sea compartido por más de una
sucursal no se debe repetir información en el sistema,
deben manejarse referencias sin objetos duplicados para
evitar consumo innecesario de memoria.

Aclaración
El sistema debe contar con búsquedas de
vehículos por marca, modelo, categoría y nivel
de desgaste, pudiendo realizar individualmente
o combinando entre marca y nivel de desgaste o
combinando categoría y nivel de desgaste.
Los datos de las sucursales son extraídos de un
archivo de donde son leídos y cargados en el
objeto (no se incluyen los datos del gerente).
Además el sistema debe permitir generar un
archivo con los datos de los vehículos de una
sucursal
*/
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
// Vehicle dealership
var TdFCar = new VehicleDealership_1.VehicleDealership(branchTolhuin, branchUshuaia, branchRioGrande);
// I run the Vehicle Dealership's System
TdFCar.enterBranchSystem(branchUshuaia);
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
