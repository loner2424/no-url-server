const express = require("express");
const {
  handleGetAllURLs
} = require("../controllers/UrlController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth)
router.get("/:userID", handleGetAllURLs);


module.exports = router;