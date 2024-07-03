const express = require('express')
const {getUser,deleteUser, getUserById,updateUser, updateAttributes} =require('../controllers/userController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getUser)
router.get('/:id', getUserById)

router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)
router.patch('/attributes/:id', updateAttributes)
module.exports = router