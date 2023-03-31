import express from "express";
import { userRouter } from "./http/routers/userRouter";
import { taskRouter } from "./http/routers/taskRouter";

const app = express();
app.use(express.json());

app.use("/", taskRouter);
app.use("/auth", userRouter);

app.listen(3333, () => console.log("Server is running!"));
