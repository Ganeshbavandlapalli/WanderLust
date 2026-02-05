const mongoose = require("mongoose");
const Schema = mongoose.Schema;
<<<<<<< HEAD
=======
const Review=require("./reviews.js")
>>>>>>> a05c4fb (added review feature)

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
  },
  price: Number,
  location: String,
  country: String,
<<<<<<< HEAD
});

=======
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }
  ]
});

listingSchema.post("findOneAndDelete",async function(listing){
  if(listing){
     await Review.deleteMany({_id:{$in: listing.reviews}})
  }
  
})

>>>>>>> a05c4fb (added review feature)
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;