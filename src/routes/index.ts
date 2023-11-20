import { Router } from "express";
import userRouter from "./usersRouter";

const router = Router();

router.use("/users", userRouter);

export default router;
