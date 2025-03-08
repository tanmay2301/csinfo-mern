import Agent from "../models/agent.model.js";

const addAgent = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        const newAgent = new Agent({ name, email, mobile, password });
        await newAgent.save();
        res.status(201).json({ message: "Agent created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

export { addAgent };
