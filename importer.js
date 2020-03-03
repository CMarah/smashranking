const smashgg = require('smashgg.js');
const { Event } = require('smashgg.js');
const controller = require('./controller.js');
smashgg.initialize('a997527f490c930f57b811a3c8437c0d');

const importSetsInOrder = async (sets, index) => {
  //TODO check if set is valid / exists
  if (index >= sets.length) return;
  await controller.saveSet(sets[index]);
  await controller.updatePlayers(sets[index]);
  return importSetsInOrder(sets, index + 1);
}

const getSets = async tournament => {
  const tournament_singles = await Event.get(tournament, 'melee-singles');
  const gg_sets = await tournament_singles.getSets();

  const players = [...(new Set(gg_sets.reduce(
    (acc, set) => acc.concat([set.player1, set.player2]), []
  )))].filter(x => x.tag);
  console.log('Players obtained!', players.length);
  await Promise.all(players.map(player => controller.savePlayer({
    name: player.tag,
    ts_avg: 40,
    ts_sig: 5,
    country: 'us',
  })));
  console.log('--------Saved Players--------');

  setTimeout(async () => {
  const sets = gg_sets.map(set => ({
    p1_name:  set.player1.tag,
    p2_name:  set.player2.tag,
    p1_score: set.score1,
    p2_score: set.score2,
    tournament_name: tournament,
  })).filter(x => x.p1_name && x.p2_name && x.p1_score >= 0 && x.p2_score >= 0);

  await importSetsInOrder(sets, 0);


  console.log('--------Saved Sets--------');
  }, 25000);
}

getSets('function-1-recursion-regional');
