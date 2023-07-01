import express from 'express';
import PowerController from '../../../controller/PowerController.js';

const router = express.Router();

// Create a new sewer problem
router.post('/', PowerController.createPower);

// Update an existing sewer problem
router.put('/:id', PowerController.updatePower);

// Get all sewers problems
router.get('/', PowerController.getAllPowers);

// Get a specific sewer problem
router.get('/:id', PowerController.getPowerById);

// Delete a sewer problem
router.delete('/:id', PowerController.deletePower);

export default router;