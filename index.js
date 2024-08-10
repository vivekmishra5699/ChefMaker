const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("api-key");

app.post("/generate-text", async (req, res) => {
  try { 
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    // Ensure the result object is logged to understand its structure
    console.log("API result:", result);

    // Accessing the response text correctly
    const response = await result.response;

    const text=response.text();
    res.json({ text });
  } catch (error) {
    console.error("Error generating text:", error.message);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
