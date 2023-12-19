const express= require('express');
const bodyParser = require('body-parser');
const app=express();

const path = require('path')

const errorcontroller=require('./controllers/error')
const db=require('./util/database')


const adminRoutes = require('./routes/admin')
const shopRoutes=require('./routes/shop')
const contactusRoutes =require('./routes/contact')
const successRoutes=require('./routes/success')

db.execute('SELECT * FROM products')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(contactusRoutes);
app.use(successRoutes);

app.use(errorcontroller.get404);

app.listen(3002)