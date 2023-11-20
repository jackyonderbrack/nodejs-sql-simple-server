import express from "express";
import apiRouter from "./routes";

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
