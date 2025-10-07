import express from 'express';
import {createIncident,getUserIncidents,getIncidentById,updateIncident,} from '../controllers/incidentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createIncident);
router.get('/', getUserIncidents);
router.get('/:id', getIncidentById);
router.put('/:id', updateIncident);

export default router;
