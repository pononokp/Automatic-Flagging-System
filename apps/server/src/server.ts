import express from "express";
import cors from "cors";
import applicationRouter from "./routers/index.js";
import bodyParser from "body-parser";
import { connectToDB } from "./config/database.js";

// Connect to DB. if this was mongoDB we would use mongoose and only run it here once
await connectToDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/application", applicationRouter);

export default app;
