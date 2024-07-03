const express = require('express')
const {getReport, 
    createReport,
    updateReport,
    getReports} 
    = require('../controllers/reportController.js')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/:id', getReport)
router.post('/:id', createReport)
router.patch('/:id', updateReport)
router.get('/', getReports)

module.exports = router