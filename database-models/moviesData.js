const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieDataSchema = new Schema({
  title: String,
  genre: String,
  thumbnailUrl: String,
  rating: Number,
  releaseDate: String,
  views: Number,
  languages: String,
  originalLanguage: String,
  category: String,
  studio: String,
  director: String,
});

const cinemaPlayMovieData = mongoose.model(
  "movieDataCollection",
  movieDataSchema
);

const cinemaPlayMovieDetailsSchema = new Schema({
  title: String,
  genre: String,
  rating: Number,
  releaseDate: String,
  views: Number,
  languages: String,
  originalLanguage: String,
  category: String,
  bannerUrl: String,
  duration: String,
  certificateType: String,
  videoUrl: String,
  description: String,
  cast: String,
  studio: String,
  director: String,
});

const cinemaPlayMovieDetails = mongoose.model(
  "cinemaPlayMovieDetails",
  cinemaPlayMovieDetailsSchema
);

const showEpisodes = new Schema({
  episodeNumber: Number,
  episodeTitle: String,
  episodeVideoUrl: String,
  episodeThumbnail: String,
  duration: String,
});

const showSeasons = new Schema({
  seasonNumber: Number,
  episodes: [showEpisodes],
});

const cinemaPlayShowDetailsSchema = new Schema({
  title: String,
  genre: String,
  rating: Number,
  releaseDate: String,
  views: Number,
  languages: String,
  originalLanguage: String,
  category: String,
  bannerUrl: String,
  certificateType: String,
  videoUrl: String,
  description: String,
  cast: String,
  studio: String,
  director: String,
  seasons: [showSeasons],
});

const cinemaPlayShowDetails = mongoose.model(
  "cinemaPlayShowDetails",
  cinemaPlayShowDetailsSchema
);

module.exports = {
  cinemaPlayMovieData,
  cinemaPlayShowDetails,
  cinemaPlayMovieDetails,
};
