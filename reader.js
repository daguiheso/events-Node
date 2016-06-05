// PUBLISHER

var fs = require('fs')
var EventEmitter = require('events')
var util = require('util')
var inherits = util.inherits /*para implementar la suerte de herencia entre funciones - inherit nodejs doc*/

/*creando nuestro propio read file async - receta para hacer funciones asincronicas*/
function readFileText (name, cb) {
	/*llamar a la funcion nextTick que esta dentro de process, esta funcion recibe como  parametro otra function
	y lo que pasa aqui es que process.nextTick es que coge esta function que le paso por parametro y la va a 
	mandar a la cola de eventos para diferir su ejecucion y va a seguir con la proxima instruccion, es decir 
	process.nextTick() agarra mi function y la pone en la cola de eventos hasta que el levenloop decida que 
	la funcion termino y llame al callback */
	process.nextTick(function () {
		var content = fs.readFileSync(name)
		cb(content.toString())
	})
}

/*creando clase ecma5 - implementacion de la clase*/
function TextReader(name) {
	// constructor
	/*class TextReader heredando las propiedades de eventEmitter con lo cual esta class se va a convertir en una clase que emitira eventos*/
	EventEmitter.call(this)  /*llamando al constructor de EventEmitter y paso por parametro la propia clase para que se inicialize la clase de EventEmitter*/
	this.name = name
}

/*copia las propiedades de eventEmitter dentro de TextReader
 una de las propiedades que se copia es emit que es una function que me permite emitir un evento */
inherits(TextReader, EventEmitter)

/*añadiendo metodo read a class TextReader*/
TextReader.prototype.read = function () {
	/*como implemento una function en el prototype de TextReader el this refiere a la instancia de TextReader que estoy ejecutando*/
	var self = this
	readFileText(this.name, function (content) { 
		self.emit('end', content) /*emite evento - parametros: nombre evento y lo que le paso al evento*/
	})  
}

//////////////////////////////////////////

/*uso de la clase*/


/*instancio textReader y le paso el nombre del archivo a leer*/
var reader = new TextReader('./lorem.txt')

module.exports = reader