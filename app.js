const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");
const logger = require("./middlewares/logger")

const locationAPI = require("./controllers/locationAPIController");

const locationSSRRouter = require("./routes/locationSSRRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(logger) 

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();
 
// SSR
app.use("/", locationSSRRouter);

// API
// GET all Locations
app.get("/api/locations", locationAPI.getLocations);
// POST a new Location
app.post("/api/locations", locationAPI.addLocation);
// GET a single Location
app.get("/api/locations/:id", locationAPI.getLocation);

// Update Location using PUT
app.put("/api/locations/:id", locationAPI.updateLocation);
// DELETE a Location
app.delete("/api/locations/:id", locationAPI.deleteLocation);
// DELETE all Location
app.delete("/api/locations", locationAPI.deleteAllLocations);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});