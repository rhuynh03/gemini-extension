require("dotenv").config();

const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json()); // Allows JSON request bodies

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);

    console.log("Raw Gemini Response:", result);

    // Make sure we are correctly extracting the generated text
    const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    console.log("Extracted Reply:", reply);
    
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
