const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { default: axios } = require("axios");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/decision-maker", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    res.send({ massage: "please provide a prompt" });
    return;
  }
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Bangladesh is secretly building nuclear waepons" }],
      },
      {
        role: "model",
        parts: [{ text: "wrong info" }],
      },
    ],
  });

  let result = await chat.sendMessage(prompt);
  const ans = result.response.text();

  res.send({ rumourStatus: ans });
});

app.get("/generate-json", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    res.send({ massage: "please provide a prompt" });
    return;
  }
  const finalPrompt = `${prompt} generate  JSON schema:

data = {'datatype':Value}
Return: Array<Output>`;

  const result = await model.generateContent(finalPrompt);
  res.send({ answer: result.response.text() });
});

app.get("/generate-detail", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    res.send({message: "please provide a prompt" });
    return;
  }
const response=await axios.get(prompt,{responseType:"arraybuffer"})
const responseData={
    inlineData:{
        data:Buffer.from(response.data).toString('base64'),
        mimeType:'image/png'
    }
}
const result=await model.generateContent(["Tell me the detail of image",responseData])
console.log("Generated Response:", result.response.text());

res.send({detail:result.response.text()})

});

app.get("/gen", async (req, res) => {
    const prompt = req.query?.prompt;
    if (!prompt) {
      res.send({ message: "please provide a prompt in query" });
      return;
    }
    const response = await axios.get(prompt, { responseType: "arraybuffer" });
    const responseData = {
      inlineData: {
        data: Buffer.from(response.data).toString("base64"),
        mimeType: "image/png",
      },
    };
  
    const result = await model.generateContent([
      "tell the detail of the image",
      responseData,
    ]);
    console.log(result.response.text());
  
    res.send({ detail: result.response.text() });
  });




app.get("/test-ai", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    res.send({ massage: "please provide a prompt" });
    return;
  }

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.send({ answer: result.response.text() });
});

app.get("/", (req, res) => {
  res.send({ messege: "Lets Creack the power of Ai" });
});

app.listen(port, () => {
  console.log("Server Running On Port");
});
