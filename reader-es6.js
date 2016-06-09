var fs = require('fs')
import EventEmitter from 'events' /*modulo de node para manejar eventos y que funciones o clases se comuniquen entre si*/

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



/*clase TextReader heredando de EventEmitter*/
class TextReader extends EventEmitter {
	/*cuando heredamos necesitamos si o si un contructor*/
	constructor(name) {
		/*para completar la herencia se hace el llamado a super() que lo que hace 
		  es llamar al constructor de la clase que estamos heredando es decir llama
		  al constructor de EventEmitter
		*/
		super()
		this.name = name
	}

	read() {
		/*con arrow function el this conserva la referencia*/
		readFileText(this.name, content => { 
			this.emit('end', content) /*emite evento - parametros: nombre evento y lo que le paso al evento*/
		})  
	}
}

/*instancio textReader y le paso el nombre del archivo a leer*/
var reader = new TextReader('./lorem.txt')
export default reader
