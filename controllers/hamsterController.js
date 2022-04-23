import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'

let hamsterController = {}


hamsterController.getAll = async (req, res) => {
    console.log('request hej')
    try {
        const colRef = collection(db, 'hamsters')
        let hamsters = []

        const snapshot = await getDocs(colRef)
        snapshot.docs.forEach((docShapshot) => {
            hamsters.push({ ...docShapshot.data(), id: docShapshot.id })
        })
        console.log(hamsters)

        res.send(hamsters)
    } catch (error) {
        res.json({ error })
    }
}

hamsterController.getRandom = async (req, res) => {
    const colRef = collection(db, 'hamsters')
    const snapshot = await getDocs(colRef)

    var randomHamster = snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)].data();

    res.send(randomHamster)

}

hamsterController.getById = async (req, res) => {
    const _id = req.params.id
    const docRef = doc(db, 'hamsters', _id)
    const hamster = await getDoc(docRef)

    if (!hamster.exists) {
        //console.log('No such document!');
        res.status(404).send('Hamster not found')
    } else {
        res.send(hamster.data())
    }

}

hamsterController.postHam = async (req, res) => {
    //const newHamRef = doc(db, 'hamsters')
    const newHamster = await doc(db, 'hamsters').add({
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        loves: req.body.loves,
        imgName: req.body.imgName,
        wins: req.body.wins,
        defeats: req.body.defeats,
        games: req.body.games
    })

    console.log('Added hamster with ID: ', newHamster.id)

    res.sendStatus(200)

}

hamsterController.putHam = async (req, res) => {
    let hamsterToChange = req.params.id
    const docRef = doc(db, 'hamsters', hamsterToChange)
    const snapshot = await getDoc(docRef)

    let newHam = snapshot.doc(hamsterToChange).update({
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood

    })

    if (!snapshot.exists) {
        res.status(404).send('Hamster not found! Please try again.')
    } else {
        res.sendStatus(200)
    }

    console.log('Changed hamster: ', newHam)
}


// hamsterController.deleteHam = async (req, res) => {
//     let deletedId = req.params.id
//     let deletedHamster = await collection(db, 'hamsters').doc(deletedId).delete()

//     console.log('Deleted hamster: ', deletedHamster)
//     res.sendStatus(200)
// }




export default hamsterController