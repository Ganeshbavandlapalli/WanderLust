const express=require("express")
const router = express.Router({ mergeParams: true });
const ExpressError=require("../utils/ExpressError.js")
const WrapAsync=require("../utils/WrapAsync.js")
const {validateListing,validateReview}=require("../validateSchema.js")
const Review=require("../models/reviews.js")
const joi=require("joi")
const Listing = require("../models/listings.js");


router.post("/",validateReview,async (req,res)=>{
    
    let  revdoc=new Review(req.body.review)
    let list= await Listing.findById(req.params.id)
    list.reviews.push(revdoc)
    await revdoc.save()
    await list.save()
    console.log("the comment is:",req.body.review.comment)
    res.redirect(`/listings/${req.params.id}`)
})


//delete route for deleting the review
router.delete("/:reviewId",WrapAsync(async (req,res)=>{
    let{id,reviewId}=req.params
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}))

module.exports=router