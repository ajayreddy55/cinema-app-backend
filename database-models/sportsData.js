const mongoose = require("mongoose");

const { Schema } = mongoose;

const sportsDataSchema = new Schema({
  title: String,
  matchDate: Date,
  category: String,
  sportType: String,
  tournamentName: String,
  imageUrl: String,
  videoUrl: String,
  certificateType: String,
  description: String,
  team1: String,
  team2: String,
  votes: Number,
});

const cinemaPlaySportsData = mongoose.model(
  "cinemaPlaySportsData",
  sportsDataSchema
);

module.exports = cinemaPlaySportsData;
