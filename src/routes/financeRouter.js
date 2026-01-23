import express from 'express';
import Finance from '../controllers/financeController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/* routes for Finance */

// Create
router.post('/finances/create', auth, Finance.createFinance);

// Get all
router.get('/finances/get-all', auth, Finance.getAllFinances);

// Get by ID
router.get('/finances/get/:id', auth, Finance.getFinanceById);

// Update by ID
router.put('/finances/update/:id', auth, Finance.updateFinance);

// Delete (soft)
router.delete('/finances/delete/:id', auth, Finance.deleteFinance);

// Activate
router.patch('/finances/activate/:id', auth, Finance.activateFinance);

// Delete (hard)
router.delete('/finances/delete/:id/hard', auth, Finance.hardDeleteFinance);

export default router;
