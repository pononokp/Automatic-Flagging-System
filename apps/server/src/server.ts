import express from "express";
import cors from "cors";
import applicationRouter from "./routers/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/application", applicationRouter);

export default app;
