const {
  signup,
  login,
  addLikedMovie,
  getLikedMovies,
  removeLikedMovie,
} = require("../controllers/UserController");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/liked/:email", getLikedMovies);
router.post("/add", addLikedMovie);
router.put("/remove", removeLikedMovie);

module.exports = router;
