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
sucursales. Cada sucursal tendrá su dirección, horarios 
de atención al público, información del gerente 
responsable de dicha sucursal (nombre, apellido, 
documento). El usuario del sistema podrá realizar la 
búsqueda de vehículos de interés en una sucursal 
específica o en todas. Cada sucursal tendrá su catálogo 
de vehículos y en el caso de que un vehículo sea 
compartido por más de una sucursal no se debe repetir 
información en el sistema, deben manejarse referencias 
sin objetos duplicados para evitar consumo innecesario 
de memoria.

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
let managerPrincipalBranchTolhuin:Manager = new Manager("Lionel","Messi",11111111);
let managerBranchUSH:Manager = new Manager("Emiliano","Martínez",22222222);
let managerBranchRG:Manager = new Manager("Enzo","Fernández",33333333);

// Initial vehicles (in arrays)
let vehiclesPrincipalBranchTolhuin:Vehicle[] = [
  new Vehicle(0,"diesel","Citroen","C4 SpaceTourer",2018,1500000,true,"van"),
  new Vehicle(0,"diesel","Peugeot","208 HDi",2012,850000,true,"car")
]
let vehiclesBranchUSH:Vehicle[] = [
  new Vehicle(0,"diesel","Renault","Kangoo",2018,900000,true,"van"),
  new Vehicle(0,"diesel","Peugeot","301 HDi",2018,700000,false,"car"),
  new Vehicle(10000,"naphtha","Ford","Fiesta",1996,700000,false,"car"),
  new Vehicle(30000,"naphtha","Citroen","C3 Aircross",2013,1300000,true,"car")
]
let vehiclesBranchRG:Vehicle[] = [
  new Vehicle(0,"diesel","Citroen","C4 Lounge HDi",2018,1025000,false,"car"),
  new Vehicle(1000,"diesel","Peugeot","408 HDi",2016,1100000,true,"car")
]

// Branch offices
let principalBranchTolhuin:BranchOffice = new BranchOffice("Tolhuin","Angela Loig 321","Lunes a viernes de 09:00 a 15:00 hs",managerPrincipalBranchTolhuin,vehiclesPrincipalBranchTolhuin)
let branchUSH:BranchOffice = new BranchOffice("Ushuaia","Héroes de Malvinas 4360","Lunes a viernes de 09:30 a 12:30 hs y de 15:00 a 20:00hs",managerBranchUSH,vehiclesBranchUSH);
let branchRG:BranchOffice = new BranchOffice("Rio Grande","Av. San Martín 2599","Lunes a viernes de 09:30 a 12:30 hs y de 15:00 a 20:00hs",managerBranchRG,vehiclesBranchRG);

// Vehicle dealership
let TdFCar:VehicleDealership = new VehicleDealership(principalBranchTolhuin,branchUSH,branchRG);

// I run the program
TdFCar.enterBranchSystem(principalBranchTolhuin);

// the system doesn't provide the function to buy a vehicle yet,
// but I will add that function after submitting this project