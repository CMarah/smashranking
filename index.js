const fetch = require('isomorphic-fetch');

const getPlayersPage = async (page, num_pages) => {
	console.log(page);
	if (page > num_pages) return [];
	const resp = await fetch('http://smasharchive.eu/api/v0.1/players/?limit=100&page='+page).then(response => response.json());
	const next = await getPlayersPage(page+1, num_pages);
	return resp.data.concat(next);
};

const getAllPlayerSlugs = async () => {
	const total = (await fetch('http://smasharchive.eu/api/v0.1/players/?limit=1').then(response => response.json())).pagination.total;
	console.log('total players: ', total);
	const num_pages = Math.ceil(total/100);
	console.log(num_pages);
	const player_urls = (new Array(num_pages)).fill(0).map((x,i,arr) =>
		'http://smasharchive.eu/api/v0.1/players/?limit=100&page='+i
	);
	console.log(player_urls);

	const full_player_data = (await getPlayersPage(1, num_pages)).map(x => x.slug);
	console.log(full_player_data);
};

getAllPlayerSlugs();

const getTournamentPage = async (page, num_pages) => {
	console.log(page);
	if (page > num_pages) return [];
	const resp = await fetch('http://smasharchive.eu/api/v0.1/players/?limit=100&page='+page).then(response => response.json());
	const next = await getPlayersPage(page+1, num_pages);
	return resp.data.concat(next);
};

const getAllTournaments = async () => {
	const total = (await fetch('http://smasharchive.eu/api/v0.1/tournaments/?limit=1').then(response => response.json())).pagination.total;
	console.log('total tournaments: ', total);
	const num_pages = Math.ceil(total/100);
	console.log(num_pages);
	const player_urls = (new Array(num_pages)).fill(0).map((x,i,arr) =>
		'http://smasharchive.eu/api/v0.1/players/?limit=100&page='+i
	);
	console.log(player_urls);

	const full_player_data = (await getPlayersPage(1, num_pages)).map(x => x.slug);
	console.log(full_player_data);
};
