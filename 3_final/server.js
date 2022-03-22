const express = require('express');
const app = express();
const { engine }  = require('express-handlebars');
const res = require('express/lib/response');


const PORT = 2000;
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));

//handlebars
app.engine('handlebars', engine({defaultLayout: 'lists'}));
app.set('views','./3_final/views')
app.set('view engine', 'handlebars');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/user', require(__dirname+'/routers/user'));
app.use('/breakfast', require(__dirname+'/routers/breakfast'));
app.use('/howToGo', require(__dirname+'/routers/howToGo'));
app.use('/starbucks', require(__dirname+'/routers/starbucks'));
app.use('/lunch', require(__dirname+'/routers/lunch'));
app.use('/snack', require(__dirname+'/routers/snack'));
app.use('/gym', require(__dirname+'/routers/gym'));
app.use('/dinner', require(__dirname+'/routers/dinner'));
app.use('/result', require(__dirname+'/routers/result'));

