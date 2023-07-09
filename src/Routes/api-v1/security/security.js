import express from 'express';
import SecurityController from '../../../controller/SewerController.js';

const router = express.Router();

// Create a new security problem
router.post("/", SecurityController.createSecurity);

// Update an existing security problem
router.put("/:id", SecurityController.updateSecurity);

// Get all security problems
router.get("/", SecurityController.getAllSecurity);

// Get a specific security problem
router.get("/:id", SecurityController.getSecurityById);

// Delete a security problem
router.delete("/:id", SecurityController.deleteSecurity);

export default router;
