const express = require('express')
const { application, cancelApplication, getApplications,getPending,patchApplication,getSingleApplication } =require("../controllers/applyController");

const router = express.Router()

router.post("/", application);
router.delete("/:id", cancelApplication);
router.get('/', getApplications)
router.get('/pending/:id', getPending)
router.get('/:id', getSingleApplication)
router.patch('/:id', patchApplication)
module.exports = router