import express from 'express';
import SecurityController from '../../../controller/SecurityController.js';

const router = express.Router();

// Create a new security problem
router.post("/", SecurityController.postProblem);

// Update an existing security problem
router.put("/:id", SecurityController.updateProblem);

// Get all security problems
router.get("/", SecurityController.getSecurities);

// Get a specific security problem
router.get("/:id", SecurityController.getSecurity);

// Delete a security problem
router.delete("/:id", SecurityController.deleteProblem);

export default router;