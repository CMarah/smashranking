const models = require('./models/index.js');
const { Rating, rate_1vs1 } = require('ts-trueskill');

const playerExists = name => models.players.findOne({ name });

const savePlayer = async player => {
  if (await playerExists(player.name)) return {
    error: 'Player with same name already exists'
  };
  console.log(player);
  return (new models.players(player)).save();
}

const saveSet = set => {
  console.log('Saving set', set);
  return (new models.sets(set)).save();
}

const updatePlayers = async set => {
  //TODO check it isn't a dq
  const player_1 = await models.players.findOne({ name: set.p1_name });
  const player_2 = await models.players.findOne({ name: set.p2_name });
  const p1 = new Rating(player_1.ts_avg, player_1.ts_sig);
  const p2 = new Rating(player_2.ts_avg, player_2.ts_sig);
  const [ new_p1, new_p2 ] = rate_1vs1(
    set.p1_score > set.p2_score ? p1 : p2,
    set.p1_score < set.p2_score ? p1 : p2,
  );
  player_1.ts_sig = Math.sqrt(1/new_p1.pi);
  player_1.ts_avg = new_p1.tau/new_p1.pi;
  player_2.ts_sig = Math.sqrt(1/new_p2.pi);
  player_2.ts_avg = new_p2.tau/new_p2.pi;
  player_1.save();
  player_2.save();
}

module.exports = {
  savePlayer,
  saveSet,
  updatePlayers,
};

//savePlayer({ name: 'Marah', ts_avg: 40, ts_sig: 4, country: 'es' });
//savePlayer({ name: 'Jukes', ts_avg: 40, ts_sig: 4, country: 'es' });
