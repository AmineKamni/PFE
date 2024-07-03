const express = require('express')
const { notificationPatch } =require("../controllers/notificationController");

const router = express.Router()

router.patch("/:id", notificationPatch);


module.exports = router