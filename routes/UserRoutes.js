const {
  signup,
  login,
  addLikedMovie,
  getLikedMovies,
  removeLikedMovie,
} = require("../controllers/UserController");
const PaymentController = require('../controllers/PaymentController');

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/liked/:email", getLikedMovies);
router.post("/add", addLikedMovie);
router.put("/remove", removeLikedMovie);
router.post('/payment/moneyfusion', PaymentController.payWithMoneyFusion);

module.exports = router;
