const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from the public folder

// API Key and Base URL
const API_KEY = "tpsg-7JxYIqr3tGlpZ0R1RLPlZ9chi0rS1L5";
const API_BASE = "https://api.metisai.ir/openai/v1";

// Endpoint for handling chat
app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    try {
        const response = await axios.post(
            `${API_BASE}/chat/completions`,
            {
                model: "gpt-4o-mini",
                messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
