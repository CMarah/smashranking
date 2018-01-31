const fetch = require('isomorphic-fetch');

console.log('Hello world');

const fetchArmada = async () => {
	const results = await fetch('http://smasharchive.eu/api/v0.1/players/%27');
	console.log(results);
}

fetchArmada();
