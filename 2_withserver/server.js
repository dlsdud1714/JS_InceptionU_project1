
let express = require('express');
let app = express();
const bfInfo = require('./routes/bf');
const start = require('./routes/UserInfo.js');
const {user, genderGoalCalorie, setCPFratio, breakfast, carloriesAdded }= require('./data')

const PORT = 2000;
app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));


app.use("/public", express.static((__dirname + "/public")));
app.use("/breakfast", bfInfo);
app.use("/gamestart", start);


app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/public/0gamestart.html');
});

app.get('/user', (req,res)=>{
    let name = req.query.name;
    let gender = req.query.gender;
    res.sendFile(__dirname + '/public/0gamestart2.html')  ;
    user.Name = name;
    user.Gender = gender;

    if(gender == 'female'){
        user.GoalCalorie = genderGoalCalorie[0];
    }else if(gender == 'male'){
        user.GoalCalorie = genderGoalCalorie[1];
    };

    user.CarbonateRatio = setCPFratio[0];
    user.ProteinRatio = setCPFratio[1];
    user.FatRatio = setCPFratio[2];
    console.log(user)
});

app.get('/breakfast',(req,res)=>{
    let options = ['sublist0', 'sublist1', 'sublist3', 'sublist4']
    let chosenBreakfast = req.query.options;
    console.log('bre',chosenBreakfast)
   
    for(let option of options){
        if(option==chosenBreakfast){
            const index = options.indexOf(chosenBreakfast);
            const chosenBf = breakfast[index];
            console.log(index);
            carloriesAdded.carb += chosenBf.carbCal;
            carloriesAdded.protein += chosenBf.proteinCal;
            carloriesAdded.fat += chosenBf.fatCal;
            carloriesAdded.sumCalories = carloriesAdded.carb+carloriesAdded.protein+carloriesAdded.fat;
            carloriesAdded.carbRatio = (carloriesAdded.carb/carloriesAdded.sumCalories).toFixed(2);
            carloriesAdded.proteinRatio = (carloriesAdded.protein/carloriesAdded.sumCalories).toFixed(2);
            carloriesAdded.fatRatio = (carloriesAdded.fat/carloriesAdded.sumCalories).toFixed(2);
        }

    }
    res.sendFile(__dirname + '/public/1breakfast.html');
});



// app.get('/userinfo/:name',(req,res)=>{
//     let name = req.params.name;
//     user.name = name;
   
//     let genderli = `<ol><li><a href="/userinfo?name=${user.name}&gender=0">${gen[0]}</a></li><li><a href="userinfo?name=${user.name}&gender=1">${gen[1]}</a></li></ol>`;
//     let userinfo = `You set user name as ${user.name}`+'<br>'+`Choose your gender.`+ genderli + '<br>'
    
   
//     let gender = req.query.gender;
//     if(gender==="0"){
        
//         user.gender = gen[0];
//         user.goalCalorie= genderGoalCalorie[0];
//         userinfo += 'Woman'+'<br>'+`Your recomanded calories intake is set to ${user.goalCalorie}cal.`
        
//     }else if(gender==="1"){
//         user.gender = gen[1];
//         user.goalCalorie= genderGoalCalorie[1];
//         userinfo += 'Man'+'<br>'+`Your recomanded calories intake is set to ${user.goalCalorie}cal.`
//     } 

//     let goal = '<br>'+`Your goal is to meet your daily carories intaks to ${user.goalCalorie}cal, and Carb:Protein:Fat ratio to ${setCPFratio}`;
//     res.send(userinfo+goal);

// })
// console.log("User name: ", user.name);
// console.log("Gender: ", user.gender);
// console.log("Your daily recommanded Carlories intake is set to ", user.goalCalorie, "cal.");