const mongoose = require('mongoose');
require('dotenv').config();
//const mongoURI = "mongodb+srv://kumarpiyush6844:Piy456@cluster0.s37cbiu.mongodb.net/notering?retryWrites=true&w=majority&appName=Cluster0"

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }
async function connectToMongo() {
    await mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
  module.exports = connectToMongo