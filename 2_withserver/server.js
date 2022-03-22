
//const express = require('express');
//const app = express();

const start = require('./routes/UserInfo.js');
const bfInfo = require('./routes/breakfast');
const commuting = require('./routes/commute');
const starbucksInfo = require('./routes/starbucks');
const lunchInfo = require('./routes/lunch');
const snackrinfo = require('./routes/snack');
const gymInfo = require('./routes/gym.js');
const dinnerInfo = require('./routes/dinner.js');

const { breakfast, commutingOptions, starbucks, lunch, snack, gymOptions, dinner}= require('./data')
const { setUserCPF, findOneFromList, calorieCal, totalToCPF, randomchoice }  = require('./functions')

const PORT = 2000;
//app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));


app.use("/public", express.static((__dirname + "/public")));
app.use("/gamestart", start);
app.use("/breakfast", bfInfo);
app.use("/howToGo", commuting);
app.use("/starbucks", starbucksInfo)
app.use("/lunch", lunchInfo);
app.use("/snack", snackrinfo);
app.use("/gym", gymInfo);
app.use("/dinner", dinnerInfo);

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/public/0gamestart.html');
});

app.get('/user', (req,res)=>{
    res.sendFile(__dirname + '/public/0gamestart2.html');
    setUserCPF(req)
});


app.get('/breakfast',(req,res)=>{

    res.sendFile(__dirname + '/public/1breakfast.html');
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

app.get('/lunchYN', (req,res)=>{
    res.sendFile(__dirname+'/public/4lunch.html');
    if(req.query.options){
        findOneFromList(req, starbucks)
            .then(chosenstar => calorieCal(chosenstar));
    }
})

app.get('/lunch', (req,res)=>{
    if(req.query.options==='sublist0'){
        res.sendFile(__dirname+'/public/4lunch1.html');
    }else if(req.query.options==='sublist1'){
        res.sendFile(__dirname +'/public/4lunch2.html');
    };
});

app.get('/snack', (req,res)=>{
    res.sendFile(__dirname+"/public/5snack.html");
    if(req.query.options){
        findOneFromList(req, lunch)
            .then(chosenLun => calorieCal(chosenLun));
        }
    });

app.get('/gym', (req,res)=>{
    res.sendFile(__dirname+"/public/6gym.html");
    if(req.query.options){
        findOneFromList(req, snack)
            .then(chosenlun=>{calorieCal(chosenlun)})
    };
});

app.get("/dinner", (req,res)=>{
    res.sendFile(__dirname+"/public/7dinner.html");
    if(req.query.options){
        findOneFromList(req, gymOptions)
            .then(chosengym=>totalToCPF(chosengym))
            .then(chosengym=>calorieCal(chosengym))
    };
})

app.get("/result", (req,res)=>{
    res.sendFile(__dirname+'/public/8result.html');
    if(req.query.options){
        findOneFromList(req, dinner)
            .then(chosendinner=>randomchoice(chosendinner, dinner))
            .then(chosendinner=>calorieCal(chosendinner))  
    };
})