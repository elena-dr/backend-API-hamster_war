import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore'
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

    if (!hamster.exists()) {
        //console.log('No such document!');
        res.status(404).send('Hamster not found')
    } else {
        res.send(hamster.data())
    }

}

hamsterController.postHam = async (req, res) => {
    console.log('Posting new hamster')

    const colRef = collection(db, 'hamsters')


    const newHamster = await addDoc(colRef, {
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        loves: req.body.loves,
        imgName: req.body.imgName,
        wins: req.body.wins,
        defeats: req.body.defeats,
        games: req.body.games
    })

    console.log('newHamster', newHamster.id)


    // console.log('Added hamster with ID: ', newHamster.id)

    res.status(200).json({ id: newHamster.id })

}

hamsterController.putHam = async (req, res) => {

    try {
        let hamsterToChange = req.params.id
        const docRef = doc(db, 'hamsters', hamsterToChange)
        console.log('docref', docRef)

        let newHam = await updateDoc(docRef, {
            name: req.body.name,
            age: req.body.age,
            favFood: req.body.favFood
        })

        res.sendStatus(200)

    } catch (error) {
        res.status(404).send('Hamster not found! Please try again.')
    }
}


hamsterController.deleteHam = async (req, res) => {
    let deletedId = req.params.id
    let deletedHamster = await collection(db, 'hamsters').doc(deletedId).delete()

    console.log('Deleted hamster: ', deletedHamster)
    res.sendStatus(200)
}




export default hamsterController