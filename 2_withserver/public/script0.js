 //get info from api
async function getData(api){
    const response = await fetch(api)
    const data = response.json();
    return data
}
 
 //to get url from client side directly urlserchparams
 
const setUser = document.getElementById("set");

function getURL(){
    
     const urlParams = new URLSearchParams(window.location.search);
     urlParams.forEach((value, name)=> {
         setUser.append(`${name}: ${value}`);
         setUser.append(document.createElement('br'))
        });
        return urlParams;

 }

 //get corresponding info from dataset


 async function finishInfo(){
     const urlParams = await getURL();
     const name = urlParams.get('name');
     const gender = urlParams.get('gender');
     let storedUserData = await getData('/gamestart/storedUser');
     let goalCalories = await getData("/gamestart/goalCalories") ;
     let CPFratio = await getData("/gamestart/ratio");
     //make storedUserData
     storedUserData.Name = name;
     
     storedUserData.Gender = gender;

     if(gender == 'female'){
         storedUserData.GoalCalorie = goalCalories[0];
     }else if(gender == 'male'){
         storedUserData.GoalCalorie = goalCalories[1];
     };

     storedUserData.CarbonateRatio = CPFratio[0];
     storedUserData.ProteinRatio = CPFratio[1];
     storedUserData.FatRatio = CPFratio[2];

     return storedUserData;
 };

//display array
async function displayArray(){
    const storedUserData= await finishInfo()
    const keys = Object.keys(storedUserData);
    const values = Object.values(storedUserData);
    let longTag
     for (let i=0; i<keys.length; i++){
        const tag = `<p>${keys[i]}: ${values[i]}</p>`
        longTag += tag;
     }
     const container = document.getElementById("set");
     container.innerHTML = longTag;
     
};

displayArray()

//save user info array
//async function store(){
   // const storedUserData = await finishInfo();
    // const option = {
    //     method: 'POST',
    //     headers: {
    //         "content-Type": "application/json"
    //     },
    //     body: JSON.stringify(storedUserData)
    // };
    //console.log(storedUserData)
    //const response = await fetch(`/gamestart/storedUser2.html?name=${storedUserData.Name}&gender=${storedUserData.Gender}`);
    //console.log(response)
    //const json = response.json();
//}
//const submitBtn = document.getElementById('btn');

// submitBtn.addEventListener('click', onClick())
// console.log(submitBtn)

