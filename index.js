var fs = require('fs')

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

readFileText('./lorem.txt', function (content) {
	console.log(content)
})
console.log('Hola Platzi')

var reader = new TextReader('./lorem.txt')

reader.on('end', function () {
	
})

reader.read()