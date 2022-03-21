
//get UserInfomation, breakfast list, lunch.... 
//later instead of get to api use Mongodb
const userApi = '/breakfast/user';
const userSetting = '/gamestart/storedUser';
const listApi = '/gym/list';

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
    //Put number in dashboard
    };
putUserSetting()

//put userinfo and breakfast
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
//------------------gym--------------------------------------------------------------
//make list
//only getData API was changed. and tag waylist and class=list
const container = document.querySelector('.gymlist'); //ul
putMealList()

async function putMealList(){
    const dataArray = await getData(listApi)
    const readyToinsert = await dataArray.map((item,index) => createBreakfastHTML(item, index)).join('');
    container.innerHTML = readyToinsert;
}

function createBreakfastHTML(item,index){
    return `<li data-key="2"><input name=options value='sublist${index}' id='sublist${index}' type="radio" class="list" value="1" />${item.name}</li>`;
}


//update by handling event

//changes: listApi, 
container.addEventListener('mousemove', event => onTextMouse(event, listApi));


async function onTextMouse(event, element){
    const dataArray = await getData(element);
    try{
        if(event.target.dataset.key !== '2'){
            return;
        };
        for(let element of dataArray){
            let nameValue = event.target.innerText;
            if(nameValue == element.name ){
                let ChosenBreakfastArray = element;
                let createdCalInfo = createCalBoardHTML(dataArray ,ChosenBreakfastArray);
                const address = document.getElementById('caloriesinfo')
                address.innerHTML = createdCalInfo;
            }
    }
}catch{console.log}
};
//changes: return string, class, id removed
function createCalBoardHTML(array, item){
        const comment = ["I will work out for an hour", "I am tired! I am going home"];
        let index = array.indexOf(item);
        return `<p class="acc">${comment[index]}`;
    
};

