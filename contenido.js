//SUBSCRIBER

var reader = require('./reader')

/*suscribirme al evento end*/
reader.on('end', function (content) {
	console.log(content);
})