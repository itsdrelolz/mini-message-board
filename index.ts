import express, { Request, Response }from "express"; 
import { indexRouter } from "./routes/indexRouter";
import path from "node:path";
import { messageRouter } from "./routes/messageRouter";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");










app.use("/", indexRouter)



const PORT = 3000 

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));