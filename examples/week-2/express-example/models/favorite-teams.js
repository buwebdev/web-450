const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteTeamsSchema = new Schema({
    teamId: { type: String },
    mascot: { type: String }
}, { collection: 'favoriteTeams'});

module.exports = mongoose.model("FavoriteTeams", favoriteTeamsSchema);