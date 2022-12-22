class Auto{
    private marca:string;
    private modelo:string;
    private patente:string;

    constructor(marcaParam:string,modeloParam:string,patenteParam:string) {
        this.marca = marcaParam;
        this.modelo = modeloParam;
        this.patente = patenteParam;
    }

    public obtenerMarca():string{
        return this.marca;
    }
    public setearMarca(pMarca:string):void{
        this.marca = pMarca;
    }
    public obtenerModelo():string{
        return this.modelo;
    }
    public setearModelo(pModelo:string):void{
        this.modelo = pModelo;
    }
    public obtenerPatente():string{
        return this.patente;
    }
    public setearPatente(pPatente:string):void{
        this.patente = pPatente;
    }
}

class RegistroAutomor{

    private listadoDeAutos:Auto[];

    constructor(paramArregloDeAutos:Auto[]){
        this.listadoDeAutos = paramArregloDeAutos;
    }
    public obtenerListaDeAutosRegistrados():Auto[]{
        return this.listadoDeAutos;
    }
    public buscarAuto(paramAuto:Auto):string{
        let patenteABuscar:string = paramAuto.obtenerPatente();
        let posicion:number = -1;
        
        for(let i:number = 0; i<this.listadoDeAutos.length;i++){
            if(patenteABuscar === this.listadoDeAutos[i].obtenerPatente()){
                posicion = i;
            }
        }
        if(posicion === -1){
            return "No está registrado";
        }else{
            return "El auto está registrado en la posición "+ posicion;
        }
    }
    public registrarAuto(paramAuto:Auto):string{
        this.listadoDeAutos.push(paramAuto);
        return "El auto se ha registrado con éxito";
    }
    public eliminarAuto(paramAuto:Auto):string{
        let patenteABuscar:string = paramAuto.obtenerPatente();
        
        for(let i:number = 0; i<this.listadoDeAutos.length;i++){
            if(patenteABuscar === this.listadoDeAutos[i].obtenerPatente()){
                this.listadoDeAutos.splice(i,1);
            }
        }
        return "El auto se ha eliminado con éxito";
    }
    public editarAuto(posicion:number,paramMarca:string,paramModelo:string,paramPatente:string):string{
        this.listadoDeAutos[posicion].setearMarca(paramMarca);
        this.listadoDeAutos[posicion].setearModelo(paramModelo);
        this.listadoDeAutos[posicion].setearPatente(paramPatente);
        return "Datos del auto modificados con éxito";
    }
}
// Autos registrados
let autoDeMarcos:Auto = new Auto("ford","fiesta","AAA111");
let autoDeMelina:Auto = new Auto("vw","gol","bbb111");
let autoDeJose:Auto = new Auto("chevrolet","astra","CCC111");
// Auto nuevo
let autoNuevo:Auto = new Auto("BMW","X8","DDD111");
// Arreglo de autos registrados
let arregloDeAutosParaRegistrarEnTDF:Auto[] = [autoDeMarcos,autoDeMelina,autoDeJose];
// Creo la instancia que usaré para la clase RegistroAutomotor
let registroAutomotorDeTierraDelFuego:RegistroAutomor = new RegistroAutomor(arregloDeAutosParaRegistrarEnTDF);

// Chequeos por consola

console.log("Lista inicial de los autos registrados");
let listaDeAutosRegistrados:Auto[] = registroAutomotorDeTierraDelFuego.obtenerListaDeAutosRegistrados();
console.log(listaDeAutosRegistrados);

console.log("Búsqueda de auto, no lo encuentra");
let busquedaDeAuto:string = registroAutomotorDeTierraDelFuego.buscarAuto(autoNuevo);
console.log(busquedaDeAuto);

console.log("Registro del auto");
let registroDeAuto:string = registroAutomotorDeTierraDelFuego.registrarAuto(autoNuevo);
console.log(registroDeAuto);

console.log("Búsqueda de auto, lo encuentra");
console.log(registroAutomotorDeTierraDelFuego.buscarAuto(autoNuevo));

console.log("Lista actualizada con el nuevo auto registrado");
console.log(listaDeAutosRegistrados);

console.log("Edición de datos del auto");
let edicionDeDatosDelAuto:string = registroAutomotorDeTierraDelFuego.editarAuto(3,"Mercedes Benz","Clase A","ZZZ999");
console.log(edicionDeDatosDelAuto);

console.log("Lista actualizada con los datos modificados del nuevo auto");
console.log(listaDeAutosRegistrados);

console.log("Eliminación del auto del registro");
let eliminacionDelAuto:string = registroAutomotorDeTierraDelFuego.eliminarAuto(autoNuevo);
console.log(eliminacionDelAuto);

console.log("Búsqueda del auto eliminado, para confirmar su correcta eliminación");
console.log(busquedaDeAuto);

console.log("Lista actualizada con el nuevo auto eliminado");
console.log(listaDeAutosRegistrados);