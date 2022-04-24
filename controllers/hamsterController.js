import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'

let hamsterController = {}


hamsterController.getAll = async (req, res) => {
    try {
        const colRef = collection(db, 'hamsters')
        let hamsters = []

        const snapshot = await getDocs(colRef)
        snapshot.docs.forEach((docShapshot) => {
            hamsters.push({ ...docShapshot.data(), id: docShapshot.id })
        })

        res.send(hamsters)
    } catch (error) {
        console.log('getAll', error)
        res.json({ error })
    }
}

hamsterController.getRandom = async (req, res) => {
    try {
        const colRef = collection(db, 'hamsters')
        const snapshot = await getDocs(colRef)

        var randomHamster = snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)].data();

        res.send(randomHamster)
    } catch (error) {
        console.log('getRandom', error)
        res.status(500).json({ error })
    }
}

hamsterController.getById = async (req, res) => {
    try {
        const _id = req.params.id
        const docRef = doc(db, 'hamsters', _id)
        const hamster = await getDoc(docRef)

        console.log('hamsterById', hamster)

        if (!hamster.exists()) res.sendStatus(404)
        else res.status(200).send(hamster.data())


    } catch (error) {
        console.log('getById', error)
        res.json({ error })
    }

}

hamsterController.postHam = async (req, res) => {
    try {
        const colRef = collection(db, 'hamsters')
        const { name, age, favFood, loves, imgName, wins, defeats, games } = req.body
        const newHamster = await addDoc(colRef, {
            name: name || "",
            age: age || 1,
            favFood: favFood || "",
            loves: loves || "",
            imgName: imgName || "",
            wins: wins || 0,
            defeats: defeats || 0,
            games: games || 0
        })
        res.status(200).json({ id: newHamster.id })
    } catch (error) {
        console.log('postHam', error)
        res.status(500).json({ error: error.message })
    }
}

hamsterController.putHam = async (req, res) => {

    try {
        let hamsterToChange = req.params.id
        const docRef = doc(db, 'hamsters', hamsterToChange)
        const { name, age, favFood, loves, imgName, wins, defeats, games } = req.body

        if (!name && !age && !favFood && !loves && !imgName && !wins && !defeats && !games) {
            res.sendStatus(400)
        }
        else {
            let newHam = await updateDoc(docRef, {
                name: name || "",
                age: age || 1,
                favFood: favFood || "",
                loves: loves || "",
                imgName: imgName || "",
                wins: wins || 0,
                defeats: defeats || 0,
                games: games || 0
            })
            console.log('success')
            res.status(200).json(newHam)
        }

    } catch (error) {
        console.log('putHam', error)
        res.status(404).send('Hamster not found! Please try again.')
    }
}


hamsterController.deleteHam = async (req, res) => {
    try {
        let deletedId = req.params.id
        const docRef = doc(db, 'hamsters', deletedId)
        const hamster = await getDoc(docRef)

        if (!hamster.exists()) sendStatus(404)
        else {
            let deletedHamster = await deleteDoc(docRef)
            console.log('deleted', deletedHamster)
            res.sendStatus(200)
        }

    } catch (error) {
        res.status(404).json({ error })
    }
}



export default hamsterController