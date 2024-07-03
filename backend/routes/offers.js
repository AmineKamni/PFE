const express = require('express')
const { createOffers,
    getOffer,
    getOffers,
    deleteOffers,
    updateOffers
} = require('../controllers/offersController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)


router.get('/', getOffers)

router.get('/:id', getOffer)
router.post('/', createOffers)

router.delete('/:id', deleteOffers)
router.patch('/:id', updateOffers)

module.exports = router