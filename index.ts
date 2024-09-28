import express, { Request, Response } from "express"; 

const indexRouter = require('./routes/indexRouter');

const app = express();

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set up view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// Use indexRouter for routing
app.use("/", indexRouter)

// Define the port
const PORT = 3000;

// Start the server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
