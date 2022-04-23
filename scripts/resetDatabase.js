// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('../firebase/firebaseConfig.json');
const serviceAccount = require('../firebase/serviceAccount.json');
const { getFirestore } = require('firebase-admin/firestore');


// JSON To Firestore
const deleteCollection = async (collection) => {
    try {
        console.log('Initialzing Firebase');
        await firestoreService.initializeFirebaseApp(serviceAccount, firebaseConfig.databaseURL);
        console.log('Firebase Initialized');

        const db = getFirestore();

        const deleted = await deleteCollection(db, collection)

        console.log('deleted collection')
    }
    catch (error) {
        console.log(error);
    }
};

deleteCollection('hamsters');



async function deleteCollection(db, collectionPath) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__')

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}




