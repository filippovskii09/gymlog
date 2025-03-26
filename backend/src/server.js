import cors from "cors";
import express from "express";
import helmet from "helmet";
import { connectDB } from "./config/db.js";
import { config } from "./config/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api", routes);

app.get("/", (_, res) => {
  res.json({ message: "Backend is running!" });
});

app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${config.PORT}`);
});

connectDB();
