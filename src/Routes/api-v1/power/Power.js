import express from 'express';
import PowerController from '../../../controller/PowerController.js';

const router = express.Router();

// Create a new sewer problem
router.post('/', PowerController.postProblem);

// Update an existing sewer problem
router.put('/:id', PowerController.updateProblem);

// Get all sewers problems
router.get('/', PowerController.getPowers);

// Get a specific sewer problem
router.get('/:id', PowerController.getPower);

// Delete a sewer problem
router.delete('/:id', PowerController.deleteProblem);

export default router;