import mongoose, { Schema, models } from "mongoose";


const ApplicationSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },


    company: String,
    role: String,
    location: String,
    seniority: String,


    skillsRequired: [String],
    skillsOptional: [String],

    status: {
        type: String,
        enum: ["Applied", "Phone Screen", "Interview ", "Offer", "Rejected"],
        default: "Applied",
        index: true,

    },


    resumeSuggestions: [String],

    notes: String,
    salaryRange: String,
    jdTeext: String,
},
    { timestamps: true }

)



export const Application = models.Application || mongoose.model("Application", ApplicationSchema)