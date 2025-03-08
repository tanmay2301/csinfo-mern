import csv from "csv-parser";
import fs from "fs";
import Task from "../models/task.model.js";
import Agent from "../models/agent.model.js";

const assignTasks = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const agents = await Agent.find();
        if (agents.length === 0) return res.status(400).json({ error: "No agents available" });

        const tasks = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (row) => {
                tasks.push({ firstName: row.FirstName, phone: row.Phone, notes: row.Notes || "" });
            })
            .on("end", async () => {
                let agentIndex = 0;
                const assignedTasks = tasks.map((task) => {
                    const assignedTask = { ...task, agentId: agents[agentIndex]._id };
                    agentIndex = (agentIndex + 1) % agents.length;
                    return assignedTask;
                });

                await Task.insertMany(assignedTasks);
                res.json({ message: "Tasks assigned successfully", assignedTasks });
            });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

export { assignTasks };
