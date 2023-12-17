const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.readTheatersByMovieID).all(methodNotAllowed);
router.route("/:movieId/reviews").get(controller.readReviewsByMovieID).all(methodNotAllowed);

module.exports = router;
