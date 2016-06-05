var reader = require('./reader.js')

/*suscribirme al evento end*/
reader.on('end', function (content) {
	console.log(content);
})

/*comienza la lectura del archivo*/
reader.read()

/*recomendable el anterior orden: instanciar, suscribirse y llamar a read*/

console.log('Hola Platzi')