import express from 'express'
const router = express.Router()

import hamsterController from '../controllers/hamsterController.js'

// Data hämtas från Firestore!

router.get('/', hamsterController.getAll)
router.get('/random', hamsterController.getRandom)
router.get('/:id', hamsterController.getById)
router.post('/', hamsterController.postHam)
router.put('/:id', hamsterController.putHam)
router.delete('/:id', hamsterController.deleteHam)




export default router