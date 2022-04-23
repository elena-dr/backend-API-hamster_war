import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

//referens till hamsters collection
const colRef = collection(db, 'hamsters')

//referens till specifik-documentet (använda id)
const docRef = doc(colRef, '')

//get-funktionen är asynkron. Den hämtar datan från databasen och lägger inuti snapshot-objektet
const snapshot = await getDoc(docRef)

//hämta data - data är ett vanlig JavaScript-objekt
const data = snapshot.data()

console.log('data: ', data)
