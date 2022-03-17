

//user info dashboard
async function getUserData(){
    const response = await fetch('/user');
    const userOutput = await response.json();
    //const toJson = JSON.stringify(userOutput);
   //document.getElementById('UserInfo').innerText= toJson;
   return userOutput
}

let onlyNumbers=[];
async function putUserHTML(){
    const UserData = await getUserData();
    const infoText = await UserData[0].name;
    document.getElementById('name').append(infoText) 
    const infoValueArray = (Object.values(UserData[1]));
    for (let i=0;i<infoValueArray.length-1;i++){
        const getID = document.getElementById(`e${i}`)
        //add span
        const span = document.createElement('span');
        span.setAttribute('id',`changingVal${i}`);
        span.innerText = infoValueArray[i];
        getID.append(span);
        //getID.appendChild(...infoValueArray[i]);
    }
    return infoValueArray;
}




//make breakfast list
const fetchTo = "/breakfast"
async function getBreakfastData(element){
    const response = await fetch(element);
    const breakfastOutput = await response.json();
    return breakfastOutput;
}

function createBreakfastHTML(item,index){
    return `<li id='sublist${index}'><input type="checkbox" class="bfelement" value="1" />${item.name}</li>`;
}

const container = document.querySelector('.bflist'); //ul

async function putBreakfastData(element){
    const breakfastData = await getBreakfastData(element);
    const readyToinsert = await breakfastData.map((item,index) => createBreakfastHTML(item, index)).join('');
    container.innerHTML = readyToinsert;
    for(let i=0;i<4;i++){
        document.getElementsByClassName('sublist')
    }
}

putUserHTML().then((response)=> onlyNumbers=response).then(()=>{
putBreakfastData(fetchTo)
    .then(item =>{
     container.addEventListener('click', event => onButtonClick(event, item, fetchTo))
    })
});

//clickeventhandler add calories
async function onButtonClick(event,item, element){
    
    const breakfastData = await getBreakfastData(element);
    
    for(let i=0;i<onlyNumbers.length-1;i++){
        const idValue = event.target.id;
        console.log(idValue)
        // if( )
        // onlyNumbers[i]= await breakfastData[i].carbCal;
        // console.log(onlyNumbers[i])
        // let getID = document.getElementById(`changingVal${i}`);
        // getID.innerHTML +=  onlyNumbers[i];   
    }
}

// .then(()=>{
//         let getID = document.getElementById(`chainginVal0`);
//         //change child
//         let parentLi =  document.getElementById('e0');
//         console.log(onlyNumbers[0])
//         const putChangedNum= getID.innerHTML(onlyNumbers[0]);
//         //const putChangedNum= await parentLi.replaceChild(onlyNumbers[0],getID);
//     })

// function updateinfoNum(){
//     for (let i=0;i<onlyNumbers.length-1;i++){
//         const getID = document.getElementById(`e${i+1}`)
//         getID.innerHTML(onlyNumbers[i]);
//        console.log(onlyNumbers[0])
//     }
// }
// function gainCalories(foodName){
//     carloriesAdded.carb +=foodName.carbCal;
//     carloriesAdded.protein +=foodName.proteinCal;
//     carloriesAdded.fat +=foodName.fatCal;
//     carloriesAdded.sumCalories = (carloriesAdded.carb+carloriesAdded.protein+carloriesAdded.fat);
//     carloriesAdded.carbRatio = (carloriesAdded.carb/carloriesAdded.sumCalories).toFixed(2);
//     carloriesAdded.proteinRatio = (carloriesAdded.protein/carloriesAdded.sumCalories).toFixed(2);
//     carloriesAdded.fatRatio = (carloriesAdded.fat/carloriesAdded.sumCalories).toFixed(2);
    
//     console.log("Your recommanded carories intake are ", user.goalCalorie, "cal.");
//     console.log(`Your goals of carbonate, protein, and fat ratios are ${setCPFratio}`);
//     console.log("Your daily calories intake so far is");
//     console.log(carloriesAdded);
// };