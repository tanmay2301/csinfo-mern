import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.router.js";
import agentRoutes from "./routes/agent.router.js";
import taskRoutes from "./routes/task.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;


app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/tasks", taskRoutes);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at ${PORT}`);
})
