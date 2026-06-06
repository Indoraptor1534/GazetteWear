
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore,getDoc,getDocs,setDoc,doc,collection,deleteDoc,arrayUnion,arrayRemove } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig={
apiKey: "AIzaSyASXbbNyrJ0jxg1kPwJODh14fMwR3EZaRg",
  authDomain: "gazettewear-85466.firebaseapp.com",
  projectId: "gazettewear-85466",
  storageBucket: "gazettewear-85466.firebasestorage.app",
  messagingSenderId: "480872722691",
  appId: "1:480872722691:web:9dd36a2268477da4213936",
  measurementId: "G-R0E5XTFRMY"
};

const app=initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth = getAuth(app);
export let CurrentId=null;

const unsubscribe=onAuthStateChanged(auth,(user) =>{
        if(user){
            console.log("Yes");
            CurrentId=user.uid;
            
        }else{
            console.log("Nope");
            CurrentId=null;
        }
})


export function waitForAuthReady() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // only run once
      resolve(user); // resolve with user (or null if not signed in)
    });
  });
}

export async function RemoveFromList(Collection, Document, Data, Value) {
  try {
    const docRef = doc(db, Collection, Document);
    await setDoc(docRef, {
      [Data]: arrayRemove(Value)
    }, { merge: true });

    console.log(` Removed "${Value}" from ${Collection}/${Document}/${Data}`);
  } catch (e) {
    console.error(" Error removing item:", e);
  }
}












export async function AddToList(Collection,Document,Data,Value){
    try{
         
          const docRef=doc(db,Collection,Document);
            await setDoc(docRef,{
                [Data]:arrayUnion(Value)
            },{merge:true});

    }catch(e){
        console.log("Error",e);
    }
}












export async function Read(Collection,Document,Data){
    if(Collection==="Users"){
        if (!CurrentId) {
            console.warn(`Read Error: No user authenticated. Cannot read from 'users' collection.`);
            return null;
        }
        if(Document===CurrentId){
    try{
        const docRef=doc(db,Collection,Document);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            return docSnap.data()[Data];
        }else{
            console.error("No such Document");
    return null;  
        }
    }catch (e){
           console.error("Error getting document:", e);
    return null;
    }
}
    }else{
        try{
        const docRef=doc(db,Collection,Document);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            return docSnap.data()[Data];
        }else{
            console.error("No such Document");
    return null;  
        }
    }catch (e){
           console.error("Error getting document:", e);
    return null;
    }
}

    }
    export async function ReadDocs(collectionName){
           const querySnapshot = await getDocs(collection(db, collectionName));

      if (querySnapshot.empty) {
        console.log(`No documents found in collection '${collectionName}'`);
        return null;

    }
       const docsList = [];
    querySnapshot.forEach((doc) => {
        docsList.push({ id: doc.id, ...doc.data() });
    });

    return docsList;
}

export async function getCollectionNames() {
  const docRef = doc(db, "MetaData", "AvailableCollections");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("Yes");
    return data.names || [];
  } else {
    console.log("No collection list found");
    return [];
  }
}

























    export async function Update(Collection,Document,Data,Value){
    
     if(Collection==="Users"){
         if (!CurrentId) {
            console.warn(`Read Error: No user authenticated. Cannot read from 'users' collection.`);
            return null;
        }
       
        if(Document===CurrentId){
    try{
       
        const docRef=doc(db,Collection,Document);
        await setDoc(docRef,{
         [Data]:Value
        },{merge:true});
    

    }catch(e){
        console.log("Error",e);
    }

}
}else{
    try{
       
        const docRef=doc(db,Collection,Document);
        await setDoc(docRef,{
         [Data]:Value
        },{merge:true});
    

    }catch(e){
        console.log("Error",e);
    } 
}
}




export async function SignUp(User,Pass,Email,) {
    try{
   const usercredential=await createUserWithEmailAndPassword(auth,Email,Pass);
   const user=usercredential.user;

   const userdocRef=doc(db,"Users",user.uid);
   await setDoc(userdocRef,{
    Username:User,
  

   });
   alert("Sign up successful! Welcome, " + User);

    return usercredential;
    }catch(e) {
    console.error("Sign-up error:", e.code, e.message);
    if (e.code === 'auth/email-already-in-use') {
        alert("This email is already in use. Please use a different one.");
    } else if (e.code === 'auth/weak-password') {
        alert("Password is too weak. Please use a stronger password.");
    } else {
        alert("An error occurred during sign up.");
    }
}
}

export async function SignIn(Email,Pass,State){
    try{
        console.log("SIGNIN FUNCTION GOT:", Email, Pass);
    const usercredential=await signInWithEmailAndPassword(auth,Email,Pass);
    const user = usercredential.user;
    const docRef=doc(db,"Users",user.uid);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
        const userData=docSnap.data();
        alert("Signed In as "+userData.Username)
        
    }else{
         console.log("No additional user data found in Firestore.");
            alert("Signed In.");
    }
    return usercredential;
}catch(e) {
       if(State=="Yes"){
        const errorCode = e.code;
        const errorMessage = e.message;
        console.error("Sign-in error:", errorCode, errorMessage);
        
        if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
            alert("Invalid email or password.");
        } else {
            alert("An error occurred during sign-in.");
        }
    }
}
}


export async function SignOut(){
    try{
    await auth.signOut();
    alert("Signed Out Successfully");
    }catch(e){
        console.error("Sign-out error:", e);
    }
}


export async function DeleteDoc(Collection,Document){
    try{
    await deleteDoc(doc(db,Collection,Document));
    console.log("Document deleted successfully");
    }catch(e){
        console.error("Error deleting document:", e);
    }
}







