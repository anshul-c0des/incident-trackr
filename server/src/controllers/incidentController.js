import Incident from "../models/Incident.js";
import { generateIncidentId } from "../utils/genIncidentId.js";

export const createIncident = async (req, res) => {   // creates an incident
  try {
    const { incidentDetails, priority } = req.body;

    if (!incidentDetails) {
      return res
        .status(400)
        .json({ message: "Incident details are required." });
    }

    let incidentId;
    let exists = true;
    while (exists) {   // checks if the Id exists, keep doing until new one is generated
      incidentId = generateIncidentId();
      exists = await Incident.findOne({ incidentId });
    }

    const newIncident = new Incident({
      incidentId,
      reporter: req.user.userId,
      incidentDetails,
      priority: priority || "Low",   // priority "Low" by default
      reportedAt: new Date(),
      status: "Open",   // status "Open" by default
    });

    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    console.error("Create incident error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserIncidents = async (req, res) => {   // fetch all incidents created by the logged in user
  try {
    const incidents = await Incident.find({ reporter: req.user.userId })
      .sort({ reportedAt: -1 })   // sort in descending order
      .populate("reporter", "name");
    res.json(incidents);
  } catch (error) {
    console.error("Get incidents error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getIncidentById = async (req, res) => {   // fetch one incident by its incidentId
  try {
    const { id } = req.params;
    const incident = await Incident.findOne({
      incidentId: id,
      reporter: req.user.userId,
    });

    if (!incident) {
      return res.status(404).json({ message: "Incident not found." });
    }

    res.json(incident);
  } catch (error) {
    console.error("Get incident error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateIncident = async (req, res) => {   // edit/update an incident
  try {
    const { id } = req.params;
    const { incidentDetails, priority, status } = req.body;

    const incident = await Incident.findOne({
      incidentId: id,
      reporter: req.user.userId,
    });

    if (!incident) {
      return res.status(404).json({ message: "Incident not found." });
    }

    if (incident.status === "Closed") {   // prevents edit if marked as 'closed'
      return res
        .status(400)
        .json({ message: "Closed incidents cannot be edited." });
    }

    if (incidentDetails !== undefined)
      incident.incidentDetails = incidentDetails;
    if (priority !== undefined) incident.priority = priority;
    if (status !== undefined) incident.status = status;

    await incident.save();
    res.json(incident);
  } catch (error) {
    console.error("Update incident error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
