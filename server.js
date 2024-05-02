const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'Web Form')));
app.get('/form',(req,res) => {
  res.sendFile(__dirname + '/Web Form/index.html')
})

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://kevzz:marckevin@cluster0.95akdf2.mongodb.net/User_Data', {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
}

connectDB(); 

app.use(bodyParser.urlencoded({ extended: false }));

const Schema = mongoose.Schema
const dataSchema = new Schema({
  name: String,
  plan: String,
  address: String,
  contactNumber: String,
  IDNumber: String,
});

const Data = mongoose.model('Data', dataSchema);

app.post('/form', (req, res) => { 
  console.log(req.body);
  const { name, plan, address, contactNumber, IDNumber } = req.body;
  const newData = new Data({ 
    name: name, 
    plan: plan, 
    address: address, 
    contactNumber: contactNumber, 
    IDNumber: IDNumber 
  });
  newData.save()
    .then(() => {
      console.log('Data saved successfully');
      
    })
    .catch(err => res.status(500).send(err.message));

    res.sendFile(__dirname+'/Web Form/form_submitted.html');  
});

app.get('/clientData', (req, res) => {

  Data.find()
  .then((data) => {
    res.json(data)
  }).catch((err) => {
    console.error(err)
  })  

})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});