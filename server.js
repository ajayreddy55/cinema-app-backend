const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  cinemaPlayMovieData,
  cinemaPlayShowDetails,
  cinemaPlayMovieDetails,
} = require("./database-models/moviesData");
const cinemaPlayNewsData = require("./database-models/newsData");
const cinemaPlaySportsData = require("./database-models/sportsData");
const sportsList = require("./list");

const app = express();

app.use(cors());
app.use(express.json());

const port = 5555 || process.env.PORT;

mongoose
  .connect(
    "mongodb+srv://ajayreddy6753:Ajay6753@ajayreddycluster.1x5u1ub.mongodb.net/cinemaPlay?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db Connected"))
  .catch((error) => console.log(error));

// const movieDataFunction = async (show) => {
//   try {
//     const movieDetails = new cinemaPlayMovieData({
//       title: show.title,
//       genre: show.genre,
//       thumbnailUrl: show.thumbnailUrl,
//       rating: show.rating,
//       releaseDate: show.releaseDate,
//       views: show.views,
//       languages: show.languages,
//       originalLanguage: show.originalLanguage,
//       category: show.category,
//       studio: show.studio,
//       director: show.director,
//     });

//     const savedMovie = await movieDetails.save();

//     const movieFullDetails = new cinemaPlayShowDetails({
//       _id: savedMovie._id,
//       title: show.title,
//       genre: show.genre,
//       rating: show.rating,
//       releaseDate: show.releaseDate,
//       views: show.views,
//       languages: show.languages,
//       originalLanguage: show.originalLanguage,
//       category: show.category,
//       studio: show.studio,
//       director: show.director,
//       bannerUrl: show.bannerUrl,
//       certificateType: show.certificateType,
//       videoUrl: show.videoUrl,
//       description: show.description,
//       cast: show.cast,
//       seasons: show.seasons,
//     });

//     await movieFullDetails.save();
//   } catch (error) {
//     console.log(error);
//   }
// };

// for (let show of showsList) {
//   movieDataFunction(show);
// }

// const newsDataFun = async (news) => {
//   try {
//     const newsDetails = new cinemaPlayNewsData({
//       title: news.title,
//       category: news.category,
//       channelName: news.channelName,
//       newsCategory: news.newsCategory,
//       newsType: news.newsType,
//       cast: news.cast,
//       thumbnailUrl: news.imageUrl,
//       videoUrl: news.videoUrl,
//       description: news.description,
//       newsTag: news.newsTag,
//       language: news.language,
//       certificateType: news.certificateType,
//       newsDate: news.newsDate,
//     });

//     await newsDetails.save();
//   } catch (error) {
//     console.log(error);
//   }
// };

// for (let news of newsList) {
//   newsDataFun(news);
// }

// const sportsDataFun = async (sport) => {
//   try {
//     const sportDetails = new cinemaPlaySportsData({
//       title: sport.title,
//       matchDate: new Date(sport.matchDate),
//       category: sport.category,
//       sportType: sport.sportType,
//       tournamentName: sport.tournmentName,
//       imageUrl: sport.imageUrl,
//       videoUrl: sport.videoUrl,
//       certificateType: sport.certificationType,
//       description: sport.description,
//       team1: sport.team1,
//       team2: sport.team2,
//       votes: sport.votes,
//     });

//     await sportDetails.save();
//   } catch (error) {
//     console.log(error);
//   }
// };

// for (let sport of sportsList) {
//   sportsDataFun(sport);
// }

app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
