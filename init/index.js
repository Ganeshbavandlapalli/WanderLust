const mongoose=require("mongoose")
const ListingModel=require("../models/listings.js")
const ListingData=require("./data.js")
const url="mongodb://127.0.0.1:27017/mydatabase"

const connectDB=async()=>{
  try{
    await mongoose.connect(url);
    console.log("connected successfully")
  }

  catch(error){
    console.log("an error occured",error)
  }
}

connectDB();

const init=async ()=>{
    await ListingModel.deleteMany({})
    await ListingModel.insertMany(ListingData.data)
    console.log("new data saved successfully")
}

init();
