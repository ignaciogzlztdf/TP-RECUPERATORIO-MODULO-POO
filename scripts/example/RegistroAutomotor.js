var Auto = /** @class */ (function () {
    function Auto(marcaParam, modeloParam, patenteParam) {
        this.marca = marcaParam;
        this.modelo = modeloParam;
        this.patente = patenteParam;
    }
    Auto.prototype.obtenerMarca = function () {
        return this.marca;
    };
    Auto.prototype.setearMarca = function (pMarca) {
        this.marca = pMarca;
    };
    Auto.prototype.obtenerModelo = function () {
        return this.modelo;
    };
    Auto.prototype.setearModelo = function (pModelo) {
        this.modelo = pModelo;
    };
    Auto.prototype.obtenerPatente = function () {
        return this.patente;
    };
    Auto.prototype.setearPatente = function (pPatente) {
        this.patente = pPatente;
    };
    return Auto;
}());
var RegistroAutomor = /** @class */ (function () {
    function RegistroAutomor(paramArregloDeAutos) {
        this.listadoDeAutos = paramArregloDeAutos;
    }
    RegistroAutomor.prototype.obtenerListaDeAutosRegistrados = function () {
        return this.listadoDeAutos;
    };
    RegistroAutomor.prototype.buscarAuto = function (paramAuto) {
        var patenteABuscar = paramAuto.obtenerPatente();
        var posicion = -1;
        for (var i = 0; i < this.listadoDeAutos.length; i++) {
            if (patenteABuscar === this.listadoDeAutos[i].obtenerPatente()) {
                posicion = i;
            }
        }
        if (posicion === -1) {
            return "No está registrado";
        }
        else {
            return "El auto está registrado en la posición " + posicion;
        }
    };
    RegistroAutomor.prototype.registrarAuto = function (paramAuto) {
        this.listadoDeAutos.push(paramAuto);
        return "El auto se ha registrado con éxito";
    };
    RegistroAutomor.prototype.eliminarAuto = function (paramAuto) {
        var patenteABuscar = paramAuto.obtenerPatente();
        for (var i = 0; i < this.listadoDeAutos.length; i++) {
            if (patenteABuscar === this.listadoDeAutos[i].obtenerPatente()) {
                this.listadoDeAutos.splice(i, 1);
            }
        }
        return "El auto se ha eliminado con éxito";
    };
    RegistroAutomor.prototype.editarAuto = function (posicion, paramMarca, paramModelo, paramPatente) {
        this.listadoDeAutos[posicion].setearMarca(paramMarca);
        this.listadoDeAutos[posicion].setearModelo(paramModelo);
        this.listadoDeAutos[posicion].setearPatente(paramPatente);
        return "Datos del auto modificados con éxito";
    };
    return RegistroAutomor;
}());
// Autos registrados
var autoDeMarcos = new Auto("ford", "fiesta", "AAA111");
var autoDeMelina = new Auto("vw", "gol", "bbb111");
var autoDeJose = new Auto("chevrolet", "astra", "CCC111");
// Auto nuevo
var autoNuevo = new Auto("BMW", "X8", "DDD111");
// Arreglo de autos registrados
var arregloDeAutosParaRegistrarEnTDF = [autoDeMarcos, autoDeMelina, autoDeJose];
// Creo la instancia que usaré para la clase RegistroAutomotor
var registroAutomotorDeTierraDelFuego = new RegistroAutomor(arregloDeAutosParaRegistrarEnTDF);
// Chequeos por consola
console.log("Lista inicial de los autos registrados");
var listaDeAutosRegistrados = registroAutomotorDeTierraDelFuego.obtenerListaDeAutosRegistrados();
console.log(listaDeAutosRegistrados);
console.log("Búsqueda de auto, no lo encuentra");
var busquedaDeAuto = registroAutomotorDeTierraDelFuego.buscarAuto(autoNuevo);
console.log(busquedaDeAuto);
console.log("Registro del auto");
var registroDeAuto = registroAutomotorDeTierraDelFuego.registrarAuto(autoNuevo);
console.log(registroDeAuto);
console.log("Búsqueda de auto, lo encuentra");
console.log(registroAutomotorDeTierraDelFuego.buscarAuto(autoNuevo));
console.log("Lista actualizada con el nuevo auto registrado");
console.log(listaDeAutosRegistrados);
console.log("Edición de datos del auto");
var edicionDeDatosDelAuto = registroAutomotorDeTierraDelFuego.editarAuto(3, "Mercedes Benz", "Clase A", "ZZZ999");
console.log(edicionDeDatosDelAuto);
console.log("Lista actualizada con los datos modificados del nuevo auto");
console.log(listaDeAutosRegistrados);
console.log("Eliminación del auto del registro");
var eliminacionDelAuto = registroAutomotorDeTierraDelFuego.eliminarAuto(autoNuevo);
console.log(eliminacionDelAuto);
console.log("Búsqueda del auto eliminado, para confirmar su correcta eliminación");
console.log(busquedaDeAuto);
console.log("Lista actualizada con el nuevo auto eliminado");
console.log(listaDeAutosRegistrados);
