import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    assignedTasks: [
        {
            firstName: { type: String, required: true },
            phone: { type: String, required: true },
            notes: { type: String }
        }
    ]
}, { timestamps: true });

agentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;
