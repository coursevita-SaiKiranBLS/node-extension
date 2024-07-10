const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const port = 4000;

// MongoDB Atlas connection string
const mongoURI =
  "mongodb+srv://bayyanakiran:d1rnLSKEysj3g63H@cluster0.8vhefls.mongodb.net";

// Database and collection names
const dbName = "jobCounts";
const collectionName = "job-counts";

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive job counts data and insert into MongoDB
app.post("/job-counts", async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const jobCountsData = req.body.jobCounts;

    // Insert job counts data into MongoDB
    const result = await collection.insertMany(jobCountsData);

    client.close();

    res.status(200).send("Data inserted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
