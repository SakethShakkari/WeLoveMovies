const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const foundReview = await service.read(Number(request.params.reviewId));

  if (foundReview) {
    response.locals.review = foundReview;
    return next();
  }

  console.log("Found Review again"+foundReview);

  return next({
    status: 404,
    message: `Review cannot be found for id: ${request.params.reviewId}`,
  });
}

async function destroy(request, response) {
  const id = Number(request.params.reviewId);
  await service.destroy(id);
  response.sendStatus(204);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const newReview = {
    ...response.locals.review,
    ...request.body.data,
  };

  await service.update(newReview);
  const updatedReview = await service.read(newReview.review_id);
  updatedReview.critic = await service.getCriticById(newReview.critic_id);
  response.json({ data: updatedReview });
}


module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
};
