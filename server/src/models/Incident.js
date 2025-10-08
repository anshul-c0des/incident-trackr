import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    incidentId: {   // unique incident Id
      type: String,
      required: true,
      unique: true,
    },
    reporter: {   // logged in user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    incidentDetails: {
      type: String,
      required: true,
    },
    reportedAt: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }   // for updated at
);

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;
