const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User=require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('66a20ad75789894205dab17a')
    .then(user=>{
    req.user= user;
    next();
})
    .catch(err=>console.log(err));

})


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://Aksshaya:drTopper%4094@cluster0.vqnabpi.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(result=>{
    User.findOne()
    .then(user=>{
        if(!user)
        {
            const user= new User({
                name:'Bravo',
                email: 'bravo@test.com',
                cart: {
                    items:[]
                }
            })
            user.save();
        }
    })
    
    app.listen(3004);
})
.catch(err=>{
console.log(err);
})

