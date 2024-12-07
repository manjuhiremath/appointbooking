const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const sequelize = require('./utils/database'); 
const router = require('./routes/user')
app.use(express.static(path.join(__dirname, 'static')));

app.use(cors());
app.use(bodyParser.json({extended:false}));
// app.use(express.static(path.join(__dirname,'views')))
// app.set('view engine','ejs')
// app.set('views','views')

app.use('/users',router)

app.use((req,res)=>{
    res.status(404).render('404',{ title: '404 - Page Not Found' })
})
app.options('*', cors());
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });