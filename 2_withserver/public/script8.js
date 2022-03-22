//get UserInfomation, breakfast list, lunch.... 
//later instead of get to api use Mongodb
const userApi = '/breakfast/user';
const userSetting = '/gamestart/storedUser';

async function getData(api){
    const response = await fetch(api);
    const Output = await response.json();
    return Output
}

//put User info
async function putUserSetting(){
    
    const UserData = await getData(userSetting);
    try{
            const getID = document.getElementById(`goal`)
            console.log(UserData)
            getID.innerHTML= `<p>${UserData.Name}, Your set Calrories intake is <b>${UserData.GoalCalorie}cal</b>.</p><p>Try to manage Calorie ratios to meet</p><p> carbonate: <b>${UserData.CarbonateRatio}</b></p><p> Protein: <b>${UserData.ProteinRatio}</b></p><p> Fat: <b>${UserData.FatRatio}<b></p>`
    }catch{console.log}
};

putUserSetting()

//put userinfo
putUserHTML()

async function putUserHTML(){
    
    const UserData = await getData(userApi);
    try{
        let infoValueArray = (Object.values(UserData));
        for (let i=0;i<infoValueArray.length;i++){
            const getID = document.getElementById(`e${i}`)
            //add span
            const span = document.createElement('span');
            span.setAttribute('id',`changingVal${i}`);
            span.innerText = infoValueArray[i];
            getID.append(span);
        }

    }catch{console.log}
};

//compare result and put calculation
async function compareTotalCal(){

    const UserData = await getData(userApi);
    const UserSetData = await getData(userSetting);
    const stringToInt = parseInt(UserSetData.GoalCalorie, 10) 
    const differ = (UserData.sumCalories-stringToInt)/stringToInt;
    return differ;
    
};

async function message(){
    const differ = await compareTotalCal();
    if(differ<=0.2 && differ >= -0.2){
        return "Success! You are good in shape.";
    }else if(differ>0.2 && differ<= 0.4){
        return "Well, Your daily Calories intake is little bit over. Next time, eat less...";
    }else if(differ>=-0.4 && differ <-0.2){
        return "Well, Your daily Calories intake is little bit less. Next time, eat more... ";
    }else if(differ>0.4){
        return "Well... You should go on a diet";
    }else if(differ<-0.4){
        return "Well... You have to eat more to live!!";
    }
}

async function displayResult(){
    
    const resultString = await message();
    const difference = await compareTotalCal()
    try{
            const getID = document.getElementById('result')
            getID.innerHTML= `Your total Calories difference is ${difference}</br> ${resultString}`
    }catch{console.log}
};

displayResult()