const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const sequelize = require('./utils/database'); 

//controls
const userControl = require('./controllers/user')


app.use(cors());
app.use(bodyParser.json({extended:false}));
// app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.set('views','views')



app.post('/add-user', userControl.createUser);
app.get('/add-user',userControl.fetchUsers);
app.put('/add-user/:id', userControl.updateUser);
app.delete('/add-user/:id', userControl.deleteUser);



app.use((req,res)=>{
    res.status(404).send('404 page not found!')
})
app.options('*', cors());
sequelize
  .sync({ alter: true }) 
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });