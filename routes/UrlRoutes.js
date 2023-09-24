const express = require("express");
const {
  handleGenerateNewShortURL,
} = require("../controllers/UrlController");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);


module.exports = router;