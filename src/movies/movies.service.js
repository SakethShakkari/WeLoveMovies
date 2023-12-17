const db = require("../db/connection");
const addCritic = require("../utils/addCritic");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movieId) {
  // TODO: Add your code here
  return db("movies")
  .select("movies.*").where({ movie_id : movieId }).first();
}

async function listTheatersByMovieId(movieId)
{
  return db("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId })
    .select("*");
}

async function listReviewsByMovieId(movieId)
{
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.movie_id": movieId })
    .select(
      "r.*",
      "c.critic_id as critic.critic_id",
      "c.preferred_name as critic.preferred_name",
      "c.surname as critic.surname",
      "c.organization_name as critic.organization_name"
    ).then(addCritic);
}

module.exports = {
  list,
  read,
  listTheatersByMovieId,
  listReviewsByMovieId
};
