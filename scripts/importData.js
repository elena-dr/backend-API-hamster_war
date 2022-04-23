// Imports
const firestoreService = require('firestore-export-import');
const { getFirestore } = require('firebase-admin/firestore');
const firebaseConfig = require('../firebase/firebaseConfig.json');
const serviceAccount = require('../firebase/serviceAccount.json');
const hamsters = require('../data/hamsters.json')


// JSON To Firestore
const uploadToFirestore = async () => {
    try {
        console.log('Initialzing Firebase');
        await firestoreService.initializeFirebaseApp(serviceAccount, firebaseConfig.databaseURL);
        console.log('Firebase Initialized');

        const db = getFirestore();
        hamsters.forEach(async h => {
            const res = await db.collection('hamsters').doc().set(h);
        })
    }
    catch (error) {
        console.log(error);
    }
};

uploadToFirestore();










