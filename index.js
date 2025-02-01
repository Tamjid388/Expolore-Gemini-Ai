const express=require("express")
const app=express();
require("dotenv").config()
const port=process.env.PORT || 5000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });







app.get('/test-ai',async(req,res)=>{
    const prompt = "difference between pixel and apple";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({answer: result.response.text()})
})


app.get('/',(req,res)=>{
    res.send({messege:'Lets Creack the power of Ai'})
})

app.listen(port,()=>{
    console.log("Server Running On Port");
})