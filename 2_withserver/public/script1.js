
//get UserInfomation, breakfast list, lunch.... 
//later instead of get to api use Mongodb
const userApi = '/insteadDb/user';
const breakfastApi = '/insteadDb/breakfast';


async function getData(api){
    const response = await fetch(api);
    const Output = await response.json();
    return Output
}


//put userinfo and breakfast
putUserHTML()

async function putUserHTML(){
    
    const UserData = await getData(userApi);
    //Put number in dashboard
    let infoValueArray = (Object.values(UserData));
    for (let i=0;i<infoValueArray.length;i++){
        const getID = document.getElementById(`e${i}`)
        //add span
        const span = document.createElement('span');
        span.setAttribute('id',`changingVal${i}`);
        span.innerText = infoValueArray[i];
        getID.append(span);
        }
        //return infoValueArray;
    };

//make breakfast list
const container = document.querySelector('.bflist'); //ul
const inputContainer = document.getElementsByClassName('bfelement')  //button
putMealList()

async function putMealList(){
    const dataArray = await getData(breakfastApi)
    const readyToinsert = await dataArray.map((item,index) => createBreakfastHTML(item, index)).join('');
    container.innerHTML = readyToinsert;
}

function createBreakfastHTML(item,index){
    return `<li id='sublist${index}' data-key="2"><input type="checkbox" class="bfelement" value="1" />${item.name}</li>`;
}


//update by handling click event


container.addEventListener('click', event => onBoxClick(event, breakfastApi));
container.addEventListener('mousemove', event => onTextMouse(event, breakfastApi));


async function onTextMouse(event, element){
    const dataArray = await getData(element);
    await putMealList();
    //click only checkobx
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
}};

function createCalBoardHTML(item){

        return `<p id='cpf0'>Carbonate: ${item.carbCal}kal</p></br><p id='cpf1'>Protein: ${item.proteinCal}kal</p></br><p id='cpf2'>Fat: ${item.fatCal}kal</p></br>`;
    
};


async function onBoxClick(event, element){
    const dataArray = await getData(element);
    await putMealList();
    console.log("enter")
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

}};

//Update into server

   
// // function gainCalories(foodName){
// //     carloriesAdded.carb +=foodName.carbCal;
// //     carloriesAdded.protein +=foodName.proteinCal;
// //     carloriesAdded.fat +=foodName.fatCal;
// //     carloriesAdded.sumCalories = (carloriesAdded.carb+carloriesAdded.protein+carloriesAdded.fat);
// //     carloriesAdded.carbRatio = (carloriesAdded.carb/carloriesAdded.sumCalories).toFixed(2);
// //     carloriesAdded.proteinRatio = (carloriesAdded.protein/carloriesAdded.sumCalories).toFixed(2);
// //     carloriesAdded.fatRatio = (carloriesAdded.fat/carloriesAdded.sumCalories).toFixed(2);
    
// //     console.log("Your recommanded carories intake are ", user.goalCalorie, "cal.");
// //     console.log(`Your goals of carbonate, protein, and fat ratios are ${setCPFratio}`);
// //     console.log("Your daily calories intake so far is");
// //     console.log(carloriesAdded);
// // }