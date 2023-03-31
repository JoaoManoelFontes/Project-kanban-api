import express from "express";

const taskRouter = express.Router();

taskRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

export { taskRouter };
