const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MONGO_URL = 'mongodb://heroku_rnnnz7s6:8kd20kgvuiq67tg0kbugjnc0t7@ds231956.mlab.com:31956/heroku_rnnnz7s6';

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => { console.log('Database connection successful') })
   .catch(err => { console.error('Database connection error') })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose error:'));

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use('*/raw_json/*', bodyParser.raw({type: "*/*"}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.get('/test', (req, res, next) => {
  console.log('backend called!');
  res.status(200).end();
});

app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' });
});

app.listen(3000, () => console.log('Listening on port 3000'));

module.exports = app;

require('./importer.js');


const getPlayersPage = async (page, num_pages) => {
  console.log(page);
  if (page > num_pages) return [];
  //const resp = await fetch('http://smasharchive.eu/api/v0.1/players/?limit=100&page=' + page).then(response => response.json());
  const next = await getPlayersPage(page + 1, num_pages);
  return resp.data.concat(next);
};

const getAllPlayerSlugs = async () => {
  //const total = (await fetch('http://smasharchive.eu/api/v0.1/players/?limit=1').then(response => response.json())).pagination.total;
  console.log('total players: ', total);
  const num_pages = Math.ceil(total / 100);
  console.log(num_pages);
  const player_urls = (new Array(num_pages)).fill(0).map((x, i, arr) =>
    'http://smasharchive.eu/api/v0.1/players/?limit=100&page=' + i
  );
  console.log(player_urls);

  const full_player_data = (await getPlayersPage(1, num_pages)).map(x => x.slug);
  console.log(full_player_data);
};

const getTournamentPage = async (page, num_pages) => {
  console.log(page);
  if (page > num_pages) return [];
  //const resp = await fetch('http://smasharchive.eu/api/v0.1/players/?limit=100&page=' + page).then(response => response.json());
  const next = await getPlayersPage(page + 1, num_pages);
  return resp.data.concat(next);
};

const getAllTournaments = async () => {
  const total = (await fetch('http://smasharchive.eu/api/v0.1/tournaments/?limit=1').then(response => response.json())).pagination.total;
  console.log('total tournaments: ', total);
  const num_pages = Math.ceil(total / 100);
  console.log(num_pages);
  const player_urls = (new Array(num_pages)).fill(0).map((x, i, arr) =>
    'http://smasharchive.eu/api/v0.1/players/?limit=100&page=' + i
  );
  console.log(player_urls);

  const full_player_data = (await getPlayersPage(1, num_pages)).map(x => x.slug);
  console.log(full_player_data);
};
