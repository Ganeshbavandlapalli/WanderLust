const express=require("express")
app=express();
app.set("viewengine","ejs")
app.set(__dirname,"views")
app.use(express.urlencoded({extended:true}))
<<<<<<< HEAD
const Listing = require("./models/listings.js");
const method_override=require("method-override")
app.use(method_override("_method"))
const path=require("path")
const ExpressError=require("./utils/ExpressError.js")
const WrapAsync=require("./utils/WrapAsync.js")
const validate=require("./validateSchema.js")
const joi=require("joi")

app.use(express.static(path.join(__dirname,"public")))

=======
const method_override=require("method-override")
app.use(method_override("_method"))
const path=require("path")




const joi=require("joi")
app.use(express.static(path.join(__dirname,"public")))
//ejs
>>>>>>> a05c4fb (added review feature)
const engine = require("ejs-mate");
app.engine("ejs", engine);
app.set("view engine", "ejs");

<<<<<<< HEAD
=======
const listings=require("./routes/listings.js")
const reviews=require("./routes/reviews.js")
>>>>>>> a05c4fb (added review feature)
const mongoose=require("mongoose");
url="mongodb://127.0.0.1:27017/mydatabase";
const connectDB=async()=>{
    try{
        mongoose.connect(url)
        console.log("mongodb connected successfully")
    }
    catch(error){
        console.log("error occured:",error)
        process.exit(1)
    }

}

connectDB()

app.listen(3002,()=>{
    console.log("hello")
})

app.use((req,res,next)=>{
    console.log(req.path)
    next();
})
app.get("/",(req,res)=>{
     res.send("hello the server is running")
})

<<<<<<< HEAD
app.get("/listings",async(req,res)=>{
    const data=await Listing.find({})
    res.render("listings/index.ejs",{data})
})

app.get("/listings/new",async (req,res)=>{
    res.render("listings/new.ejs");
})
app.get("/listings/:id",WrapAsync(async (req,res)=>{
    let id=req.params.id
    let hotel=await Listing.findById(id)
    res.render("listings/show.ejs",{hotel})

}))

app.get("/listings/:id/edit",WrapAsync(async (req,res)=>{
        let{id}=req.params
        let data=await Listing.findById(id)
        res.render("listings/edit.ejs",{data})
     }))

app.post("/listings/add",validate,WrapAsync(async (req,res)=>{
    
     let list=new Listing(req.body.list)
     list.save();
     res.redirect("/listings")
    
}))

//edit listing
app.put("/listings/:id",validate,WrapAsync(async (req,res)=>{
    let{id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.list})
    res.redirect(`/listings/${id}`);
})
)

//delete route

app.delete("/listings/:id",WrapAsync(async (req,res)=>{
    let{id}=req.params
    let deletedlist=await Listing.findByIdAndDelete(id);
    res.redirect("/listings")

}))
=======
app.use("/listings",listings)
app.use("/listings/:id/review",reviews)

>>>>>>> a05c4fb (added review feature)

app.use((req,res,next)=>{
    next(new ExpressError("PageNotfound",404))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).render("error/error.ejs", {
    statusCode,
    message
  });
});


