const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:/devnote";
const connectToMongo=async()=>{
try{
   await mongoose.connect(mongoURI);
   console.log("Connected to Mongo Successfully");
}
    catch(err){

        console.log("Error connecting to MongoDB:",err);
    }
}
module.exports=connectToMongo;