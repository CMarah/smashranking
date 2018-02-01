fs = require('fs');

function rank(players, sets) {
    players.map(x => x.skill = [25.0, 25.0 / 3.0]); //Initialize Trueskill data (mu 25, sigma 25/3)
    sets.map(x => { //Apply set results
        winner = players.find(y => y.id == x.winner);
        loser = players.find(y => y.id == x.loser);
        XWinsOverY(winner, loser);
    })
    players.map(x => x.score = (x.skill[0] - 3 * x.skill[1])); //Calculate score
    players.sort((x, y) => x.skill - y.skill); //Order by score
    fs.writeFile('ranking.json', players);
}

function XWinsOverY(winner, loser) {
    winner.rank = 1;
    loser.rank = 2;
    trueskill.AdjustPlayers(winner, loser);
}