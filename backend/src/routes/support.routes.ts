import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';
import { createSupportRequest, getAllSupportRequests } from '../controllers/support.controller';
import { getUserSupportRequests } from '../controllers/support.controller';



const router = express.Router();

router.post('/', authenticate, createSupportRequest);
router.get('/', authenticate, requireAdmin, getAllSupportRequests);
router.get('/my', authenticate, getUserSupportRequests);

export default router;
