const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movieId = request.params.movieId;
  console.log("Movie ID"+movieId);
  const foundMovie = await service.read(movieId);
  console.log("found Movie"+foundMovie);
  if (foundMovie) {
    response.locals.movie = foundMovie;
    return next();
  }
  return next({
    status: 404,
    message: `Movie does not exist for id: ${movieId}`,
  });
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data : response.locals.movie});
}

async function list(request, response) {
  const is_showing = request.query.is_showing;
  const data = await service.list(is_showing); 
  response.json({data });
}

async function readTheatersByMovieID(request,response,next)
{
  const data = await service.listTheatersByMovieId(Number(request.params.movieId));
  response.json({ data });
}

async function readReviewsByMovieID(request,response,next)
{
  const data = await service.listReviewsByMovieId(Number(request.params.movieId));
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  readTheatersByMovieID: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheatersByMovieID)],
  readReviewsByMovieID: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviewsByMovieID)]
};
