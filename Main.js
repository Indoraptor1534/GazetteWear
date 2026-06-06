
import {Read,Update,SignUp,SignIn,auth,SignOut,ReadDocs,getCollectionNames, AddToList,waitForAuthReady,RemoveFromList} from "./FBINIT.js";
import { FieldValue } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
let Username ;
let CurrentUserId=null;
let Email;
let Pass;
let Usr;
let Closest;
let list;
let detailedList = [];
let TOTAL=0






auth.onAuthStateChanged(async (user)=>{
if(user){
    if(document.getElementById("usr")){
    CurrentUserId=user.uid;
    localStorage.setItem("IU",CurrentUserId);   
    Username=await Read("Users",CurrentUserId,"Username");
    document.getElementById("usr").innerHTML=Username;
    }

}else{
    console.log("Signin")
    CurrentUserId=null;
}
});

if(document.getElementById("usr")){
document.getElementById("usr").addEventListener("click",function(){
if(!CurrentUserId){
    window.location.href="SignUp.html";

}

});
}


if(document.getElementById("submit")){
document.getElementById("submit").addEventListener("click",async function(){
    await login();
});
document.addEventListener("keydown",async function(e){
    if(e.key==="Enter"){
        await login();
    }
});
}
 

if(document.getElementById("SO")){
document.getElementById("SO").addEventListener("click",function(e){
   
        if(CurrentUserId){
SignOut().then(()=>{
    window.location.href="index.html";

    })
}
    
});
}





async function login(){
       if(!Email){
        Email=document.getElementById("email").value;
        console.log(Email);
document.getElementById("email").style.display="none";
document.getElementById("pass").style.display="flex";
document.getElementById("usrn").style.display="none";
document.getElementById("sio").innerHTML="Enter your password"
document.getElementById("lgd").innerHTML="Password"
    }else if(!Pass){
        Pass=document.getElementById("pass").value;
        console.log(Pass);
await SignIn(Email,Pass,"No").then((usercred)=>{
    if(usercred){
    window.location.href="index.html";
    }
});   
document.getElementById("pass").style.display="none";
document.getElementById("lgd").innerHTML="Username"
document.getElementById("usrn").style.display="flex";
document.getElementById("sio").innerHTML="Enter your username"

}else if(!Usr){
Usr=document.getElementById("usrn").value;
console.log
const usercred = await SignUp(Usr, Pass, Email);
console.log
   if(usercred){
    window.location.href="index.html";
    console.log("Worked")
   }

}
}

if(document.getElementsByClassName("TOU")[0]){
document.getElementsByClassName("TOU")[0].addEventListener("click",function(){
    window.open("Terms.html","_blank");
});
}
function Close(){
        document.body.style.overflow = "";
  document.getElementById("searchbar").style.opacity="0"
    document.getElementById("Sug").style.opacity="0"
    document.getElementById("X").style.opacity="0"
      document.getElementById("OVR").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("OVR").style.display="flex";
     document.getElementById("Sug").style.display="none";
      document.getElementById("searchbar").style.display = "none";
       document.getElementById("X").style.display = "none";
        document.getElementById("LFT").style.display = "flex";
         document.getElementById("RHT").style.display = "flex";
         document.getElementById("OVR").style.display="none"
    }, 300); 

console.log(document.getElementById("OVR").style.display)
      document.getElementById("LFT").style.opacity="1"
document.getElementById("RHT").style.opacity="1"

document.getElementById("Had").classList.remove("slide")
document.getElementById("GW").style.transform="translate(0px , 0px)"



}

    function Open(){
        document.body.style.overflow = "hidden";
document.getElementById("OVR").style.opacity="1"
document.getElementById("LFT").style.opacity="0"
document.getElementById("RHT").style.opacity="0"
document.getElementById("Had").classList.add("slide")
document.getElementById("GW").style.transform="translate(0px , -35px)"
    document.getElementById("searchbar").style.display="flex"
    document.getElementById("Sug").style.display="flex"
    document.getElementById("X").style.display = "flex";
    document.getElementById("OVR").style.display="flex"
    
    
    

setTimeout(() => {
    document.getElementById("LFT").style.display = "none";
    document.getElementById("RHT").style.display = "none";
    document.getElementById("searchbar").style.opacity = "1";
     document.getElementById("Sug").style.opacity = "1";
         document.getElementById("X").style.opacity="1"
}, 500);
    }

if(document.getElementById("searchl")){
document.getElementById("searchl").addEventListener("click",async function(e){
 Open();




});
}
if(document.getElementById("search")){
document.getElementById("search").addEventListener("click",async function(e){
 Open();




});
}


 async function ShowResults(Lst,length,Cont,Item){
   

const container= document.querySelector(Cont||".ResultContainer");
const style=Item||"ResultBox"

 container.innerHTML = '';
 console.log(Lst)


console.log(container.classList)

if(length>0){
for (let i = 0; i < length; i++) {

const  resultbox=document.createElement("div");
resultbox.classList.add(style);
resultbox.id = `${style}${i+1}`

resultbox.dataset.collection = Lst[i].Collection;
console.log("Creating with style:", style);


const GrayPart=document.createElement("div");
GrayPart.classList.add(`${style}Gray`);
console.log(`${style}Gray`)
     const img = document.createElement("img");
      img.src = Lst[i].IMG;        
      img.alt = Lst[i].id;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.borderRadius = "10px";

      GrayPart.appendChild(img);

const WhitePart=document.createElement("div");
WhitePart.classList.add(`${style}White`);



if(style==="BagItem"){
 let get =   await Read("Users",CurrentUserId,"Bag",Lst[i].id);
     const currentCount = parseInt(get) || 0;

 if(currentCount===0){
    await Update("Users",CurrentUserId,`Bag.${Lst[i].Name}`,1);
    get=1;
 }else{
    get=currentCount;
 }
 console.log("Get:",get);
const NameAndSize=document.createElement("div");
NameAndSize.classList.add("BagNameAndSize");
  const NameAndMrp=document.createElement("div");
NameAndMrp.classList.add("BagNameAndMRP");
    const text1=document.createElement("h1");
text1.classList.add("bagitemname");
text1.textContent=Lst[i].id;


const text2=document.createElement("h1");
text2.classList.add("bagitemsize");
text2.textContent=`Size:${Lst[i].Size}`;

const text3=document.createElement("h1");
text3.classList.add("bagitemmrp");
text3.textContent=`MRP:${Lst[i].Cost}$`;

const TrashIcon=document.createElement("img");
TrashIcon.classList.add("TrashIcon");
TrashIcon.src="Icons/Trash.png"
TrashIcon.style.width="35px"
TrashIcon.style.height="35px"
TrashIcon.style.cursor="pointer"
TrashIcon.id=`Trash${i}`

const Minus=document.createElement("p");
Minus.classList.add("Minus");
Minus.textContent="-";
Minus.id=`Minus${i}`;

TrashIcon.src="Icons/Trash.png"
TrashIcon.style.width="35px"
TrashIcon.style.height="35px"
TrashIcon.style.cursor="pointer"
TrashIcon.id=`Trash${i}`
 
const TrashAndMinus=document.createElement("div");
TrashAndMinus.classList.add("TrashAndMinus");
TrashAndMinus.appendChild(TrashIcon);
TrashAndMinus.appendChild(Minus);

const Number=document.createElement("h1");
Number.classList.add("Number");
Number.style.fontSize="16px"
Number.style.marginRight="10px"
Number.textContent=get;
Number.id=`Num${i}`
const Plus=document.createElement("h1");
Plus.classList.add("Plus");
Plus.style.fontSize="20px"
Plus.style.marginRight="10px"
Plus.textContent=`+`
Plus.id=`Plus${i}`
const RemoveBtn=document.createElement("button");
RemoveBtn.classList.add("remove-btn");
RemoveBtn.appendChild(TrashAndMinus);
RemoveBtn.appendChild(Number);
RemoveBtn.appendChild(Plus);
TrashIcon.addEventListener("click", async function(e){
    const confirmation = confirm(`Are you sure you want to remove "${Lst[i].id}" from your bag?`);
  if (!confirmation) return;
    const uid = CurrentUserId || localStorage.getItem("IU");
    if (!uid) return alert("Please sign in first!");
 
    
    await RemoveFromList("Users", uid, "Bag", Lst[i].id);
    console.log(`✅ Removed "${Lst[i].id}" from bag for:`, uid);
   
    resultbox.remove();
  
    const cost = parseFloat(Lst[i].Cost) || 0;
    TOTAL -= cost;
    document.getElementById("TOTAL").innerHTML=`${TOTAL}$`
    document.getElementById("ETOTAL").innerHTML=TOTAL+10
    
  
    
});
Minus.addEventListener("click", async function(e){
document.getElementById(`Num${i}`).textContent=parseInt(document.getElementById(`Num${i}`).textContent)-1;

  console.log("Minus clicked")
  Check(i);
  
    const cost = parseFloat(Lst[i].Cost) || 0;
    TOTAL -= cost;
    document.getElementById("TOTAL").innerHTML=`${TOTAL}$`
    document.getElementById("ETOTAL").innerHTML=`${TOTAL+10}$`
    await Update("Users",CurrentUserId,"No:Of",Lst[i].id,parseInt(document.getElementById(`Num${i}`).textContent));
  
    
});
Plus.addEventListener("click", async function(e){
    console.log("Plus clicked")
    const uid = CurrentUserId || localStorage.getItem("IU");
    document.getElementById(`Num${i}`).textContent=parseInt(document.getElementById(`Num${i}`).textContent)+1;

  
    const cost = parseFloat(Lst[i].Cost) || 0;
    TOTAL += cost;
    document.getElementById("TOTAL").innerHTML=`${TOTAL}$`
    document.getElementById("ETOTAL").innerHTML=`${TOTAL+10}$`
       await Update("Users",CurrentUserId,"No:Of",Lst[i].id,parseInt(document.getElementById(`Num${i}`).textContent));
     Check(i);
    
  
    
});

NameAndMrp.appendChild(text1);
NameAndMrp.appendChild(text3);
NameAndSize.appendChild(NameAndMrp);
NameAndSize.appendChild(text2);
WhitePart.appendChild(NameAndSize);
WhitePart.appendChild(RemoveBtn);

}else{

    const text1=document.createElement("h1");
text1.style.fontWeight="400"
text1.style.fontSize = '20px';
text1.textContent=Lst[i].id;

WhitePart.appendChild(text1);
   const text2=document.createElement("h1");
text2.style.fontSize = '15px';
text2.style.marginTop='-5px';
text2.style.color='rgb(94, 94, 94)';
text2.textContent=`Size:${Lst[i].Size}`;

const text3=document.createElement("h1");
text3.style.fontSize = '20px';
text3.style.marginTop='-5px';
text3.textContent=`MRP:${Lst[i].Cost}$`;
WhitePart.appendChild(text2);
WhitePart.appendChild(text3); 
}





resultbox.appendChild(GrayPart);

resultbox.appendChild(WhitePart);

container.appendChild(resultbox);





}
if(document.getElementById("Shw")){
document.getElementById("Shw").innerHTML=`Showing results for ${Closest}`
}
document.querySelectorAll(".ResultBox").forEach((box, index) => {
  setTimeout(() => {
    box.classList.add("slide");
  }, index * 100); // small delay between each
});
setTimeout(function(){
if(container.classList.contains("ResultContainer")){
document.getElementById("SP").style.opacity="1"
document.getElementById("SP").style.marginLeft="-10px";
}
} , 600)


     
        }else{
            container.innerHTML="No Results Found.Try changing the filters"
        }

}

if(document.getElementById("searchbar")){
   document.getElementById("searchbar").addEventListener("keydown",async function(e){
    if(!window.location.pathname.includes("Search")){
    if(e.key === "Enter"){
   Search();

    
    }
}else{
    if(e.key === "Enter"){
    let Src=document.getElementById("searchbar").value
    Src=Src.toLowerCase();
    console.log(Src);
    Closest=await FindClosest(Src);
    console.log(Closest);
        list= await ReadDocs(Closest);
        localStorage.setItem("Search",Closest);
        console.log(list);
    
       if(list && list.length > 0){
           await  ShowResults(list, list.length);
       
            
        } else {
       
            console.log("Noope")
            const container = document.querySelector(".ResultContainer");
            container.innerHTML = '';
            container.innerHTML = '<p>No results found</p>';

        }

}
}
});

}


document.addEventListener("DOMContentLoaded",async function(){
    if(window.location.pathname.includes("Search")){
        const RP=localStorage.getItem("Page");
        if(RP=="RP"){
            localStorage.removeItem("Page");
           let Src= localStorage.getItem("Closest");
           document.getElementById("searchbar").value=Src;
           Src=Src.toLowerCase();
    console.log(Src);
    Closest=await FindClosest(Src);
    console.log(Closest);
        list= await ReadDocs(Closest);
         localStorage.setItem("Search",Closest);
        console.log(list);
    
       if(list && list.length > 0){
            const CST=parseFloat(localStorage.getItem("Cst"));
        const Sz=localStorage.getItem("Sz");
        await FL(Sz,CST);
        document.getElementById("Cst").value=CST;
document.getElementById("Sz").value=Sz;
       
            
        } else {
       
            console.log("Noope")
            const container = document.querySelector(".ResultContainer");
            container.innerHTML = '';
            container.innerHTML = '<p>No results found</p>';

        }
           
        }else if(RP!="RP"){
             
    let Src=localStorage.getItem("Search");
    document.getElementById("searchbar").value=Src;
    Src=Src.toLowerCase();
    console.log(Src);
    Closest=await FindClosest(Src);
    console.log(Closest);
        list= await ReadDocs(Closest);
         localStorage.setItem("Search",Closest);
        console.log(list);
    
       if(list && list.length > 0){
           await  ShowResults(list, list.length);
       
            
        } else {
       
            console.log("Noope")
            const container = document.querySelector(".ResultContainer");
            container.innerHTML = '';
            container.innerHTML = '<p>No results found</p>';

        }

    }

        
    }
})


    if( document.getElementById("Home")){
 document.getElementById("Home").addEventListener("click" , function(){
    window.location.href="index.html"
 })
}


async function FindClosest(input) {
  const collections = await getCollectionNames();

  if (!collections || collections.length === 0) {
    console.error("No collections found");
    return null;
  }

  const { bestMatch } = stringSimilarity.findBestMatch(input.toLowerCase(), collections);
  console.log("Best match:", bestMatch.target);
  return bestMatch.target;
  
}
if(document.getElementById("Shw")){
document.getElementById("Shw").addEventListener("click" , function(e){
    Closest=localStorage.getItem("Search");
    console.log(Closest);
    document.getElementById("searchbar").value=Closest;

   
    location.reload();


});
}
if(document.getElementById("Cst")){
document.getElementById("Cst").addEventListener("change", async function(e){
 
const cst = parseFloat(this.value);
const Sz = document.getElementById("Sz").value;
FL(Sz,cst);
});
}



if(document.getElementById("Sz")){
document.getElementById("Sz").addEventListener("change", async function(e){

const Sz = this.value
const cst = parseFloat(document.getElementById("Cst").value);
await FL(Sz,cst);
})
}




if(document.getElementById("usr")){
  
document.getElementById("usr").addEventListener("click" , function(){
    console.log("Cli")
    document.getElementById("DO").classList.add("slide")
})
    }



window.addEventListener("click", (event) => {
  if(document.getElementById("DO")){
  if (!document.getElementById("DO").contains(event.target) && event.target !== document.getElementById("usr")) {
    document.getElementById("DO").classList.remove("slide");
  }
}
});

if(document.getElementById("X")){
   document.getElementById("X").addEventListener("click" , function(){
    if(window.location.pathname.includes("ResultPage")){
        const WHR=localStorage.getItem("WHR");
        if(!WHR){
       window.location.href="Search.html" 
       localStorage.setItem("Page","RP")
        }else{
            if(WHR==="FIND"){
        window.location.href="index.html"
        localStorage.removeItem("WHR");
        }
    }
    }else if(window.location.pathname.includes("index")&&!window.location.pathname.includes("ResultPage")&&!window.location.pathname.includes("Search")){
    Close();
    }else{
        window.location.href="index.html"
    }
   })
}
if(document.getElementById("RC")){
document.getElementById("RC").addEventListener("click",function(event){
      const box = event.target.closest(".ResultBox");

    if (box) {
       const text1=box.querySelector("h1").textContent;
         localStorage.setItem("Closest",Closest);
        localStorage.setItem("Name",text1);
        const CST=document.getElementById("Cst").value;
        const Sz=document.getElementById("Sz").value;
        localStorage.setItem("Cst",CST);
        localStorage.setItem("Sz",Sz);
        window.location.href="ResultPage.html"
    }
});
}

if(document.getElementById("FC")){
document.getElementById("FC").addEventListener("click",async function(event){
    console.log("FC")
      const box = event.target.closest(".ResultBox");
      console.log(box)

    if (box) {
         const collection = box.dataset.collection;
       const text1=box.querySelector("h1").textContent;
      
         localStorage.setItem("Closest",collection);
        localStorage.setItem("Name",text1);
   localStorage.setItem("Cst", 1000)
   localStorage.setItem("Sz", "")
        window.location.href="ResultPage.html"
        localStorage.setItem("WHR","FIND")
    }
});
}

document.addEventListener("DOMContentLoaded", async function(e){
if(window.location.pathname.includes("ResultPage")){
const Collection=localStorage.getItem("Closest");
const Name=localStorage.getItem("Name");
const PgCost=await Read(Collection,Name,"Cost");
const PgSz=await Read(Collection,Name,"Size");
const IMG=await Read(Collection,Name,"IMG");
console.log(PgCost);
console.log(PgSz);
document.getElementById("IMG").src=IMG;
document.getElementById("idName").innerHTML=Name;
document.getElementById("idCst").innerHTML= `M.R.P: ${PgCost}$`;
document.getElementById("idSz").innerHTML=`Size: ${PgSz}`;
document.getElementById("WPG").classList.add("visible")

}
})






async function FL(Sz,cst){
if(Sz==""){
console.log("Budget:", cst, typeof cst);
console.log("Budget:", Sz, typeof Sz);
let CstLst= [];
let i;
for(i=0;i<list.length;i++){
    console.log(list[i]);
const Cost=await Read(Closest,list[i].id,"Cost");
if(cst>Cost){
    console.log(list[i])
    CstLst.push({
            id: list[i].id, 
    name: list[i].id,   // or list[i].Name if you have a Name property
    Cost: list[i].Cost, // match the property name used in ShowResults
    Size: list[i].Size,
    IMG: list[i].IMG
    }
        );
}

}
console.log(CstLst);

await ShowResults(CstLst,CstLst.length);




              

            

    
}else{




console.log("Budget:", cst, typeof cst);
console.log("Budget:", Sz, typeof Sz);
let CstLst= [];
let i;
for(i=0;i<list.length;i++){
    console.log(list[i]);
const Size=await Read(Closest,list[i].id,"Size");
const Cost=await Read(Closest,list[i].id,"Cost");
if(Size==Sz&& cst>Cost){
    console.log(list[i])
    CstLst.push({
            id: list[i].id, 
    name: list[i].id,  
    Cost: list[i].Cost, 
    Size: list[i].Size,
     IMG: list[i].IMG
    }
        );
}

}
console.log(CstLst);

await ShowResults(CstLst,CstLst.length);



              

            
}
}

if(document.getElementById("Sug")){
    document.getElementById("Sug").addEventListener("click", async function(e){
        if(e.target.id){
        document.getElementById("searchbar").value=e.target.id;
        Search();
        }
    });
}

if(document.getElementById("Filt")){
    document.getElementById("Filt").addEventListener("click", function(e){
        document.getElementById("ovr").display="flex";
    })
}


function Search(){
    localStorage.setItem("Search",document.getElementById("searchbar").value);
    window.location.href="Search.html"
}

document.addEventListener("DOMContentLoaded", async function(){
    if(!window.location.pathname.includes("ResultPage")&&!window.location.pathname.includes("Search")&&!window.location.pathname.includes("SignUp")&&!window.location.pathname.includes("Bag")){
        let Cont =".featuredcontainer"
let List=[];
let Alldocs=[];
     const collections = await getCollectionNames();
     for(let i=0;i<collections.length;i++){
          List= await ReadDocs(collections[i]);
           List = List.map(doc => ({ ...doc, Collection: collections[i] }));
          Alldocs=Alldocs.concat(List);

    
     }
     let Randoms=[];
     const mediaQuery = window.matchMedia("(max-width: 768px)");
     if(!mediaQuery.matches){
     for(let i = 0; i < 4 && Alldocs.length > 0; i++){
         const randomIndex = Math.floor(Math.random() * Alldocs.length);
      const randomDoc = Alldocs.splice(randomIndex, 1)[0]; // remove to avoid repeat
      Randoms.push(randomDoc);

      
         
}
    await ShowResults(Randoms,4,Cont,);
    }else{
    for(let i = 0; i < 4 && Alldocs.length > 0; i++){
             const randomIndex = Math.floor(Math.random() * Alldocs.length);
      const randomDoc = Alldocs.splice(randomIndex, 1)[0]; // remove to avoid repeat
      Randoms.push(randomDoc);

      
         
}
    await ShowResults(Randoms,4,Cont,);
}
}
});



if(document.getElementById("scroll-marker")) {
const marker = document.getElementById("scroll-marker");

const observer = new IntersectionObserver(entries => {
  const e = entries[0];

  if (!e.isIntersecting){

    document.getElementById("Had").style.backgroundColor="rgba(255, 255, 255, 1)";
    document.getElementById("Had").style.boxShadow="1px 3px 8px rgba(0, 0, 0, 0.662)    ";
    document.getElementById("Had").style.color="black";
    document.getElementById("searchl").style.color="black";
     document.getElementById("searchl").classList.add("black");
  document.getElementById("DO").style.backgroundColor="rgba(255, 255, 255, 1)";
                  document.getElementById("DO").style.backdropFilter="blur(0px)";
                     document.getElementById("AU").classList.add("W");
                     document.getElementById("SO").classList.add("W");
                        
                                  document.getElementById("AU").style.color="black";
                                        document.getElementById("SO").style.color="black";
            Array.from(document.getElementsByClassName("Sug")).forEach(el => {
    el.classList.add("black");
});
        Array.from(document.getElementsByClassName("icon")).forEach(el => {
    el.style.filter = "invert(0%)"
});

  }
  else{
        document.getElementById("Had").style.backgroundColor="rgba(52, 52, 52, 0)";
    document.getElementById("Had").style.boxShadow="0 0px 0px rgba(0, 0, 0, 0.1)";
    document.getElementById("Had").style.color="white";
    document.getElementById("searchl").style.color="white";
    document.getElementById("searchl").classList.remove("black");
         document.getElementById("DO").style.backgroundColor="rgba(0, 0, 0, 0.17)";
            document.getElementById("AU").classList.remove("W");
                     document.getElementById("SO").classList.remove("W");
                  document.getElementById("DO").style.backdropFilter="blur(10px)";
                           
                            
                                  document.getElementById("AU").style.color="white";
                                        document.getElementById("SO").style.color="white";
                Array.from(document.getElementsByClassName("Sug")).forEach(el => {
    el.classList.remove("black");
});
    Array.from(document.getElementsByClassName("icon")).forEach(el => {
    el.style.filter = "invert(100%)"
});
  }
}, { threshold: 0 });

observer.observe(marker);
}


if (document.getElementById("ADDTOBAG")) {
  document.getElementById("ADDTOBAG").addEventListener("click", async function (e) {
    const uid = CurrentUserId || localStorage.getItem("IU");
    if (uid) {
      const Name = localStorage.getItem("Name");
      await AddToList("Users", uid, "Bag", Name);
      console.log("✅ Added to bag for:", uid);
      alert("Item added to bag!");
      window.location.href = "index.html";
    } else {
      alert("Please sign in first!");
    }
  });
}


document.addEventListener("DOMContentLoaded", async function () {
const user = await waitForAuthReady();

  if (window.location.pathname.includes("Bag")) {
    const uid = CurrentUserId || localStorage.getItem("IU");
    if (!uid) return alert("Please sign in first!");

    const container = document.querySelector(".BagContainer");
    container.innerHTML = "<p>Loading your bag...</p>";

    const bagItems = await Read("Users", uid, "Bag");
    if (!bagItems || bagItems.length === 0) {
      container.innerHTML = "<p>Your bag is empty.</p>";
      return;
    }

    // 🔍 Get all available collections in your Firestore
    const collections = await getCollectionNames();
    

    // Loop through each item in the bag
    for (const itemName of bagItems) {
      let foundCollection = null;
      let cost = null, size = null, img = null;

      // Try each collection until we find where this item exists
      for (const collectionName of collections) {
        const test = await Read(collectionName, itemName, "Cost");
        if (test !== null && test !== undefined) {
          foundCollection = collectionName;
          cost = test;
          size = await Read(collectionName, itemName, "Size");
          img = await Read(collectionName, itemName, "IMG");
          break; // stop checking other collections
        }
      }

      if (foundCollection) {
        detailedList.push({
          id: itemName,
          name: itemName,
          Cost: cost,
          Size: size,
          IMG: img,
          Collection: foundCollection
        });
      } else {
        console.warn(`Item "${itemName}" not found in any collection.`);
      }
    }

    //  Show results
    if (detailedList.length > 0) {
      await ShowResults(detailedList, detailedList.length, ".BagContainer", "BagItem");
      for(let i=0;i<detailedList.length;i++){
          const cost = parseFloat(detailedList[i].Cost) || 0;
         TOTAL+=cost;
        }
        document.getElementById("TOTAL").innerHTML=`${TOTAL}$`
        document.getElementById("ETOTAL").innerHTML=`Estimated Total: ${TOTAL+10}$`
    } else {
      container.innerHTML = "<p>Items not found or bag is empty.</p>";
    }
  }
  
});


if(document.getElementById("Bag")){
    document.getElementById("Bag").addEventListener("click" , function(){
window.location.href="Bag.html"
    });
}

function Check(id){
    if(document.getElementById(`Num${id}`).textContent=="2"){

        console.log("Minus")
        document.getElementById(`Minus${id}`).style.display="inline";
         document.getElementById(`Trash${id}`).style.display="none";
    }
    if(document.getElementById(`Num${id}`).textContent=="1"){
        document.getElementById(`Minus${id}`).style.display="none";
         document.getElementById(`Trash${id}`).style.display="block";
    }
}








