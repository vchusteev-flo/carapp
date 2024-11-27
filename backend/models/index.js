const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')

// Initialize Express app
const app = express();
const port = 3004;

// MongoDB Connection URI
const uri = "mongodb://localhost:27017/testDB"; // Replace `testDB` with your database name

// Import InquirySchema
const { InquirySchema } = require("./Inquiry"); // Update the path to your schema file

// Mongoose Model
const Inquiry = mongoose.model("Inquiry", InquirySchema);

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Handle connection errors
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Confirm connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// Routes
app.get("/", (req, res) => {
  res.send("Hello, MongoDB with Mongoose!");
});

// Add an inquiry
app.post("/inquiries", async (req, res) => {
  try {
    const { date, userId, userName, carModel } = req.body;
    // const { date, userId, userName, carModel } = {date: new Date(), userId: '1', userName:'Vladimir', carModel:'Tesla' };

    // Validate required fields
    if (!date) {
      return res.status(400).send({ error: "Date is required" });
    }

    // Create a new inquiry
    const newInquiry = new Inquiry({ date, userId, userName, carModel });
    const result = await newInquiry.save();
    res.status(201).send({ message: "Inquiry created", inquiry: result });
  } catch (err) {
    res.status(500).send({ error: "Error creating inquiry", details: err.message });
  }
});

// Get all inquiries
app.get("/inquiries", async (req, res) => {
    console.log("inquiries")
  try {
    const inquiries = await Inquiry.find();
    res.status(200).send(inquiries);
  } catch (err) {
    res.status(500).send({ error: "Error fetching inquiries", details: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close connection on exit
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("MongoDB connection closed");
  process.exit(0);
});
