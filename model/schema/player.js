const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playfab: String,
  commonAlias: String,
  kills: Number,
  assists: Number,
  deaths: Number,
  totalScore: Number,
  roundsPlayed: Number,
  averageScore: Number
});

playerSchema.methods.addToStat = function (statName, increment) {
  const STAT_NAMES = new Set(['kills', 'assists', 'deaths']);

  if (!STAT_NAMES.has(statName)) {
    throw new Error('Stat name: ' + statName + ' does not exist');
  }

  this[statName] += increment;
  return this.save();
};

const PlayerModel = mongoose.model('Player', playerSchema);

const registerPlayer = ({
  playfab,
  commonAlias = '',
  kills = 0,
  assists = 0,
  deaths = 0,
  totalScore = 0,
  roundsPlayed = 0,
  averageScore = 0
}) => {
  console.log('registering player...', {
    playfab,
    commonAlias,
    kills,
    assists,
    deaths,
    totalScore,
    roundsPlayed,
    averageScore
  });

  if (!playfab || typeof playfab !== 'string') {
    throw new Error('Player id required');
  }

  const newPlayer = new PlayerModel({
    playfab,
    commonAlias,
    kills,
    assists,
    deaths,
    totalScore,
    roundsPlayed,
    averageScore
  });

  return newPlayer.save();
};

module.exports = { PlayerModel, registerPlayer };
