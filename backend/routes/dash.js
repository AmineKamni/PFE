const express = require('express')
const { stats } =require("../controllers/dashController");

const router = express.Router()


router.get("/", stats);

module.exports = router