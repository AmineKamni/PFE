const express = require('express')
const {getPdf, createPdf} = require('../controllers/pdfController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)



router.get('/:id', getPdf)
router.post('/:id', createPdf)




module.exports = router