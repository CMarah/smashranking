const fetch = require('isomorphic-fetch');

console.log('Hello world');

const fetchArmada = async () => {
	const results = await fetch('http://smasharchive.eu/api/v0.1/players/%27');
	console.log(results);
}


const getAllPlayerSlugs = async () => {
	const total = (await fetch('http://smasharchive.eu/api/v0.1/players/?limit=1').then(response => response.json())).pagination.total;
	console.log('total players: ', total);
	const num_pages = Math.ceil(total/250);
	console.log(num_pages);
	const player_urls = (new Array(num_pages)).fill(0).map((x,i,arr) =>
		'http://smasharchive.eu/api/v0.1/players/?limit=250&page='+i
	);
	console.log(player_urls);
};

getAllPlayerSlugs();
