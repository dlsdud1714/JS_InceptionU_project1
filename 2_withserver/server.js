
let express = require('express');
let app = express();
const start = require('./routes/UserInfo.js');
const bfInfo = require('./routes/bf');
const commuting = require('./routes/commute');
const starbucksInfo = require('./routes/starbucks');
const lunchInfo = require('./routes/lunch')

const {user, genderGoalCalorie, setCPFratio, breakfast, commutingOptions}= require('./data')
const { findOneFromList, calorieCal, totalToCPF }  = require('./functions')

const PORT = 2000;
app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));


app.use("/public", express.static((__dirname + "/public")));
app.use("/gamestart", start);
app.use("/breakfast", bfInfo);
app.use("/howToGo", commuting);
app.use("/starbucks", starbucksInfo)
app.use("/lunch", lunchInfo);


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

    res.sendFile(__dirname + '/public/1breakfast.html');
    // if(req.query.bfoptions){
    //     findOneFromList(req, breakfast).then(chosenBf=> calorieCal(chosenBf));
    // };
});

app.get('/howToGo',(req,res)=>{
    res.sendFile(__dirname +'/public/2commute.html');
    if(req.query.options){
        findOneFromList(req, breakfast).then(chosenBf=> calorieCal(chosenBf));
    };
});

app.get('/starbucks', (req,res)=>{
    res.sendFile(__dirname + '/public/3starbucks.html');
    if(req.query.options){
    findOneFromList(req, commutingOptions)
        .then(chosenway => totalToCPF(chosenway))
        .then(chosenway => calorieCal(chosenway))
    };
});