import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { useState } from "react"

const db = getFirestore()
const user = getAuth().currentUser
const [tambaah,setTambah] = useState<number>(0)
const tambah = () => {
 

} 
