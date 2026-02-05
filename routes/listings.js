const express=require("express")
const router=express.Router()
const ExpressError=require("../utils/ExpressError.js")
const WrapAsync=require("../utils/WrapAsync.js")
const {validateListing,validateReview}=require("../validateSchema.js")
const Review=require("../models/reviews.js")
const joi=require("joi")
const Listing = require("../models/listings.js");

router.get("/",async(req,res)=>{
    const data=await Listing.find({})
    res.render("listings/index.ejs",{data})
})

router.get("/new",async (req,res)=>{
    res.render("listings/new.ejs");
})
router.get("/:id",WrapAsync(async (req,res)=>{
    let id=req.params.id
    let hotel=await Listing.findById(id).populate("reviews")
    res.render("listings/show.ejs",{hotel})

}))

router.get("/:id/edit",WrapAsync(async (req,res)=>{
        let{id}=req.params
        let data=await Listing.findById(id)
        res.render("listings/edit.ejs",{data})
     }))

router.post("/add",validateListing,WrapAsync(async (req,res)=>{
    
     let list=new Listing(req.body.list)
     list.save();
     res.redirect("/listings")
    
}))

//edit listing
router.put("/:id",validateListing,WrapAsync(async (req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.list})
    res.redirect(`/listings/${id}`);
})
)

//delete route

router.delete("/:id",WrapAsync(async (req,res)=>{
    let{id}=req.params
    let deletedlist=await Listing.findByIdAndDelete(id);
    res.redirect("/listings")

}))

module.exports=router