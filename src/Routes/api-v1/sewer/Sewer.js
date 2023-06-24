import express from 'express';
import SewerController from '../../../controller/SewerController.js';

const router = express.Router();

// Create a new sewer problem
router.post('/', SewerController.createSewer);

// Update an existing sewer problem
router.put('/:id', SewerController.updateSewer);

// Get all sewers problems
router.get('/', SewerController.getAllSewers);

// Get a specific sewer problem
router.get('/:id', SewerController.getSewerById);

// Delete a sewer problem
router.delete('/:id', SewerController.deleteSewer);

export default router;