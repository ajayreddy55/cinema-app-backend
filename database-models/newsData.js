const mongoose = require("mongoose");

const { Schema } = mongoose;

const newsDataSchema = new Schema({
  title: String,
  category: String,
  channelName: String,
  newsCategory: String,
  newsType: String,
  cast: String,
  thumbnailUrl: String,
  videoUrl: String,
  description: String,
  newsTag: String,
  language: String,
  certificateType: String,
  newsDate: String,
});

const cinemaPlayNewsData = mongoose.model("cinemaPlayNewsData", newsDataSchema);

module.exports = cinemaPlayNewsData;
