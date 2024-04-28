import express from 'express';
import imageRoutes from './image/image.js';
import donorRoutes from './donor/donor.js';
import listingRoutes from './donor/listing.js';
import userRoutes from './user/user.js';
import orderRoutes from './order/order.js';

const router = express.Router();
router.use('/upload', imageRoutes);
router.use('/donor', donorRoutes);
router.use('/listing', listingRoutes);
router.use('/user', userRoutes);
router.use('/order', orderRoutes);

export default router;
