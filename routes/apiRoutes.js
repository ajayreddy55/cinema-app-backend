const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const {
  cinemaPlayMovieData,
  cinemaPlayMovieDetails,
  cinemaPlayShowDetails,
} = require("../database-models/moviesData");
const mongoose = require("mongoose");
const cinemaPlayNewsData = require("../database-models/newsData");
const cinemaPlaySportsData = require("../database-models/sportsData");

const router = express.Router();

router.get("/movies-show", jwtAuth, async (request, response) => {
  try {
    const {
      genre = "",
      rating = "",
      views = "",
      languages = "",
      original_language = "",
      category = "",
      studio = "",
      director = "",
    } = request.query;

    const moviesQueryObject = {};

    if (genre) {
      moviesQueryObject.genre = { $regex: genre, $options: "i" };
    }

    if (rating) {
      const convertedRating = parseFloat(rating);
      if (!isNaN(convertedRating)) {
        moviesQueryObject.rating = { $gte: convertedRating };
      }
    }

    if (views) {
      const convertedViews = parseInt(views);
      if (!isNaN(convertedViews)) {
        moviesQueryObject.views = { $gte: convertedViews };
      }
    }

    if (languages) {
      moviesQueryObject.languages = { $regex: languages, $options: "i" };
    }

    if (category) {
      moviesQueryObject.category = { $regex: category, $options: "i" };
    }

    if (original_language) {
      moviesQueryObject.originalLanguage = {
        $regex: original_language,
        $options: "i",
      };
    }

    if (studio) {
      moviesQueryObject.studio = { $regex: studio, $options: "i" };
    }

    if (director) {
      moviesQueryObject.director = { $regex: director, $options: "i" };
    }

    const moviesFiltered = await cinemaPlayMovieData.find(moviesQueryObject);

    return response.status(200).json({ movies_shows: moviesFiltered });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/movies-shows-details/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;

    const movieShowObject = await cinemaPlayMovieData.findOne({ _id: id });

    if (!movieShowObject) {
      return response.send(404).json({ message: "Details Not Found" });
    }

    if (movieShowObject.category === "movies") {
      const movieDetailsObject = await cinemaPlayMovieDetails.findOne({
        _id: id,
      });

      const movieGenreList = movieDetailsObject.genre.split(",");

      const similarMovies = await cinemaPlayMovieData.find({
        _id: { $ne: id },
        category: { $regex: movieDetailsObject.category, $options: "i" },
        genre: {
          $in: movieGenreList.map((eachGenre) => new RegExp(eachGenre, "i")),
        },
      });
      return response.status(200).json({
        movieDetails: movieDetailsObject,
        similarMovies: similarMovies,
      });
    } else if (movieShowObject.category === "tv-shows") {
      const showDetailsObject = await cinemaPlayShowDetails.findOne({
        _id: id,
      });

      const showGenreList = showDetailsObject.genre.split(",");

      const similarShows = await cinemaPlayMovieData.find({
        _id: { $ne: id },
        category: { $regex: showDetailsObject.category, $options: "i" },
        genre: {
          $in: showGenreList.map((eachGenre) => new RegExp(eachGenre, "i")),
        },
      });
      return response
        .status(200)
        .json({ showDetails: showDetailsObject, similarShows: similarShows });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/news", jwtAuth, async (request, response) => {
  try {
    const {
      channel_name = "",
      news_category = "",
      news_type = "",
      news_tag = "",
      language = "",
    } = request.query;

    const newsQueryObject = {};

    if (channel_name) {
      newsQueryObject.channelName = { $regex: channel_name, $options: "i" };
    }

    if (news_category) {
      newsQueryObject.newsCategory = { $regex: news_category, $options: "i" };
    }

    if (news_type) {
      newsQueryObject.newsType = { $regex: news_type, $options: "i" };
    }

    if (news_tag) {
      newsQueryObject.newsTag = { $regex: news_tag, $options: "i" };
    }

    if (language) {
      newsQueryObject.language = { $regex: language, $options: "i" };
    }

    const newsFilteredList = await cinemaPlayNewsData.find(newsQueryObject);

    return response.status(200).json({ newsList: newsFilteredList });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/news-details/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;

    const newsDetailsObject = await cinemaPlayNewsData.findOne({ _id: id });

    if (!newsDetailsObject) {
      return response.status(404).json({ message: "No Data Found" });
    }

    const similarNews = await cinemaPlayNewsData.find({
      _id: { $ne: id },
      newsCategory: { $regex: newsDetailsObject.newsCategory, $options: "i" },
    });

    return response
      .status(200)
      .json({ newsDetails: newsDetailsObject, similarNews: similarNews });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/sports", jwtAuth, async (request, response) => {
  try {
    const {
      matchDate = "",
      sportType = "",
      tournamentName = "",
      team1 = "",
      team2 = "",
      votes = "",
    } = request.query;

    const sportsQueryObject = {};

    if (matchDate) {
      const dateObject = new Date(matchDate);
      sportsQueryObject.matchDate = { $gte: dateObject };
    }

    if (sportType) {
      sportsQueryObject.sportType = { $regex: sportType, $options: "i" };
    }

    if (tournamentName) {
      sportsQueryObject.tournamentName = {
        $regex: tournamentName,
        $options: "i",
      };
    }

    if (team1) {
      sportsQueryObject.team1 = { $regex: team1, $options: "i" };
    }

    if (team2) {
      sportsQueryObject.team2 = { $regex: team2, $options: "i" };
    }

    if (votes) {
      const convertedVotes = parseInt(votes);
      if (!isNaN(convertedVotes)) {
        sportsQueryObject.votes = { $gte: convertedVotes };
      }
    }

    const sportsListResponse = await cinemaPlaySportsData.find(
      sportsQueryObject
    );

    return response.status(200).json({ sportsList: sportsListResponse });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/sports-details/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;

    const sportDetailsResponse = await cinemaPlaySportsData.findOne({
      _id: id,
    });

    if (!sportDetailsResponse) {
      return response.status(404).json({ message: "No Data Found" });
    }

    const similarSports = await cinemaPlaySportsData.find({
      _id: { $ne: id },
      sportType: { $regex: sportDetailsResponse.sportType, $options: "i" },
    });

    return response
      .status(200)
      .json({
        matchDetails: sportDetailsResponse,
        similarMatches: similarSports,
      });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

module.exports = router;
