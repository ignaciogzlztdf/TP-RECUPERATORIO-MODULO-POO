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

import { VehicleDealership } from "./VehicleDealership";
import { Manager } from "./Manager";
import { BranchOffice } from "./BranchOffice";
import { Vehicle } from "./Vehicle";


/* Instantiated classes */

// Managers
let managerBranchTolhuin:Manager = new Manager("Lionel","Messi",11111111);
let managerBranchUshuaia:Manager = new Manager("Emiliano","Martínez",22222222);
let managerBranchRioGrande:Manager = new Manager("Enzo","Fernández",33333333);


function generateBranchOffices():BranchOffice[] {
  let fs:any = require('fs');
  let textFileContent:string = fs.readFileSync('../textFile/branchesData.txt', 'utf8');
  let branchesData:string[] = textFileContent.split("<>");

  // I initialize the parameters I'll use to build the branches
  let cities:string[] = [];
  let addresses:string[] = [];
  let openHours:string[] = [];
  let vehicles:Vehicle[][] = [];

  for (let i:number = 1; i < branchesData.length; i++){
    let branchesDataLines:string[] = branchesData[i].split("\n");
    cities.push(branchesDataLines[2].split(": ")[1].trim());
    addresses.push(branchesDataLines[3].split(": ")[1].trim());
    openHours.push(branchesDataLines[4].split(": ")[1].trim());

    let vehiclesInBranch:Vehicle[] = [];
    for (let j = 6; j < branchesDataLines.length; j += 9 ){
      if (branchesDataLines[j].trim() === "- Vehicle"){
        let brand:string = branchesDataLines[j + 1].split(": ")[1].trim();
        let model:string = branchesDataLines[j + 2].split(": ")[1].trim();
        let yearOfProduction:number = Number(branchesDataLines[j + 3].split(": ")[1].trim());
        let kilometres:number = Number(branchesDataLines[j + 4].split(": ")[1].trim());
        let category:string = branchesDataLines[j + 5].split(": ")[1].trim().toLowerCase();
        let fuelType:string = branchesDataLines[j + 6].split(": ")[1].trim().toLowerCase();
        let serviceUpToDate:boolean;
        if (branchesDataLines[j + 7].split(": ")[1].trim().toLowerCase() === "yes"){
          serviceUpToDate = true;
        } else {
          serviceUpToDate = false;
        }
        let price:number = Number(branchesDataLines[j + 8].split(": ")[1].trim());

        let vehicle:Vehicle = new Vehicle(kilometres,fuelType,brand,model,yearOfProduction,price,serviceUpToDate,category);
        vehiclesInBranch.push(vehicle);
      }
    }
    vehicles.push(vehiclesInBranch);
  }

  let branchOffices: BranchOffice[] = [];

  for (let i :number = 0; i < cities.length; i++){
    switch (i){
      case 0:
        branchOffices.push(new BranchOffice(cities[i],addresses[i],openHours[i],managerBranchTolhuin,vehicles[i]));
        break;
      case 1:
        branchOffices.push(new BranchOffice(cities[i],addresses[i],openHours[i],managerBranchUshuaia,vehicles[i]));
        break;
      case 2:
        branchOffices.push(new BranchOffice(cities[i],addresses[i],openHours[i],managerBranchRioGrande,vehicles[i]));
        break;
    }
  }
  return branchOffices;
}

// here I assign the branches created
let branchTolhuin:BranchOffice = generateBranchOffices()[0];
let branchUshuaia:BranchOffice = generateBranchOffices()[1];
let branchRioGrande:BranchOffice = generateBranchOffices()[2];

// Vehicle dealership
let TdFCar:VehicleDealership = new VehicleDealership(branchTolhuin,branchUshuaia,branchRioGrande);


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