import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5003;



app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
