
//get UserInfomation, breakfast list, lunch.... 
//later instead of get to api use Mongodb
const userApi = '/breakfast/user';
const breakfastApi = '/breakfast/list';
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
            getID.innerHTML= `<p>${UserData.Name}, Your set Calrories intake is <b>${UserData.GoalCalorie}cal</b>.</p><p>Try to manage Calorie ratios to meet </p><p> carbonate: <b>${UserData.CarbonateRatio}</b></p><p> Protein: <b>${UserData.ProteinRatio}</b></p><p> Fat: <b>${UserData.FatRatio}<b></p>`
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
    //Put number in dashboard
    };

//make breakfast list
const container = document.querySelector('.bflist'); //ul
putMealList()

async function putMealList(){
    const dataArray = await getData(breakfastApi)
    const readyToinsert = await dataArray.map((item,index) => createBreakfastHTML(item, index)).join('');
    container.innerHTML = readyToinsert;
}

function createBreakfastHTML(item,index){
    return `<li data-key="2"><input name=options value='sublist${index}' id='sublist${index}' type="radio" class="bfelement" value="1" />${item.name}</li>`;
}


//update by handling click event


//container.addEventListener('click', event => onBoxClick(event, breakfastApi));
container.addEventListener('mousemove', event => onTextMouse(event, breakfastApi));


async function onTextMouse(event, element){
    const dataArray = await getData(element);
    //await putMealList();
    //click only checkbox
    try{
        if(event.target.dataset.key !== '2'){
            return;
            
        };
        for(let element of dataArray){
            let nameValue = event.target.innerText;
            if(nameValue == element.name ){
                let ChosenBreakfastArray = element;
                let createdCalInfo = createCalBoardHTML(ChosenBreakfastArray);
            const address = document.getElementById('caloriesinfo')
            address.innerHTML = createdCalInfo ;
            }

    }
}catch{console.log}
};

function createCalBoardHTML(item){

        return `<p id='cpf0'>Carbonate: ${item.carbCal}kal</p></br><p id='cpf1'>Protein: ${item.proteinCal}kal</p></br><p id='cpf2'>Fat: ${item.fatCal}kal</p></br>`;
    
};


async function onBoxClick(event, element){
    const dataArray = await getData(element);

    try{
        for(let element of dataArray){
            let nameValue = event.target.parentElement.innerText;
        
            if(nameValue == element.name ){
                let ChosenBreakfastArray = element;
                let getCarb = document.getElementById('changingVal0');
                let getProtein = document.getElementById('changingVal1');
                let getFat = document.getElementById('changingVal2');
                let changedCarb = ChosenBreakfastArray.carbCal
                let changedProtein = ChosenBreakfastArray.proteinCal
                let changedFat = ChosenBreakfastArray.fatCal
                getCarb.innerHTML = changedCarb;
                getProtein.innerHTML = changedProtein
                getFat.innerHTML = changedFat;
                //add CPF to Total
                let getTotal = document.getElementById('changingVal3');
                let changedTotal = ChosenBreakfastArray.carbCal
           }
    }
}catch{console.log}
    

}



