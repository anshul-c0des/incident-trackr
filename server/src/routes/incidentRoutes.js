import express from 'express';
import {createIncident,getUserIncidents,getIncidentById,updateIncident,} from '../controllers/incidentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// incident routes
router.post('/', authenticateToken, createIncident);
router.get('/', authenticateToken, getUserIncidents);
router.get('/:id', authenticateToken, getIncidentById);
router.put('/:id', authenticateToken, updateIncident);

export default router;
