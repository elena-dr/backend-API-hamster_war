import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// const initializeApp = require('firebase-admin')
// const getFirestore = require('firebase-admin/firestore')

// const createRequire = require('module')
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

let firebaseConfig;
if (process.env.PRIVATE_KEY) {
    firebaseConfig = JSON.parse(process.env.PRIVATE_KEY)
} else {
    firebaseConfig = require('./firebaseConfig.json')
}
//const firebaseConfig = require('./firebaseConfig.json')


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }