const express = require('express')
const {getPfe, createPfe, patchPfe,getPfeId} = require('../controllers/pfeController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)



router.get('/', getPfe)
router.get('/:id', getPfeId)
router.post('/', createPfe)
router.patch('/:id', patchPfe)



module.exports = router