const express=require("express")
const app=express();
const port=process.env.PORT || 5000;



app.get('/',(req,res)=>{
    res.send({messege:'Lets Creack the power of Ai'})
})

app.listen(port,()=>{
    console.log("Server Running On Port");
})