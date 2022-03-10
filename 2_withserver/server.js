const {
    user, gen, genderGoalCalorie, setCPFratio
}=require('./data.js');

let express = require('express');
let app = express();

const PORT = 2000;

app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));

app.get('/stayinshape',(req,res)=>{
    
    res.send(`Welcome to "Stay in Shape!" game, to continue type your name in, curl http://localhost:2000/userinfo?name=...`);
})

app.get('/userinfo',(req,res)=>{
    let name = req.query.name;
    user.name = name;
   
    let genderli = `<ol><li><a href="/userinfo?name=${user.name}&gender=0">${gen[0]}</a></li><li><a href="userinfo?name=${user.name}&gender=1">${gen[1]}</a></li></ol>`;
    let userinfo = `You set user name as ${user.name}`+'<br>'+`Choose your gender.`+ genderli + '<br>'
    
   
    let gender = req.query.gender;
    if(gender==="0"){
        
        user.gender = gen[0];
        user.goalCalorie= genderGoalCalorie[0];
        userinfo += 'Woman'+'<br>'+`Your recomanded calories intake is set to ${user.goalCalorie}cal.`
        
    }else if(gender==="1"){
        user.gender = gen[1];
        user.goalCalorie= genderGoalCalorie[1];
        userinfo += 'Man'+'<br>'+`Your recomanded calories intake is set to ${user.goalCalorie}cal.`
    } 

    let goal = '<br>'+`Your goal is to meet your daily carories intaks to ${user.goalCalorie}cal, and Carb:Protein:Fat ratio to ${setCPFratio}`;
    res.send(userinfo+goal);

})
// console.log("User name: ", user.name);
// console.log("Gender: ", user.gender);
// console.log("Your daily recommanded Carlories intake is set to ", user.goalCalorie, "cal.");