
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
            getID.innerHTML= `<p>${UserData.Name}, Your set Calrorie intake is <b>${UserData.GoalCalorie}cal</b>.</p><p>Try to manage Calorie ratios to </p><p> carbonate: <b>${UserData.CarbonateRatio}</b></p><p> Protein: <b>${UserData.ProteinRatio}</b></p><p> Fat: <b>${UserData.FatRatio}<b></p>`
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