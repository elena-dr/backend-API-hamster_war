import express from 'express'
const router = express.Router()

import hamsterController from '../controllers/hamsterController.js'

// Data hämtas från Firestore!

router.get('/', hamsterController.getAll)
router.get('/random', hamsterController.getRandom)
router.get('/:id', hamsterController.getById)
router.post('/hamsters', hamsterController.postHam)
router.put('/:id', hamsterController.putHam)




export default router