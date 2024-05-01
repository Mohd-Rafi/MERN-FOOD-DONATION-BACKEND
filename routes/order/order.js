import express from 'express';
import Order from '../../db/models/orderSchema.js';
import Listing from '../../db/models/listingSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    const listing = await Listing.findByIdAndUpdate(body.listing, {
      status: 'BOOKED',
    });
    const order = await Order.create(body);
    res.status(200).json({ message: 'Your order added', order });
  } catch (error) {
    res.status(400).json(error);
  }
});

//get order listing-user details by donor in donor home
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.find({ listing: id }).populate('user');
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get your bookings mians by user in user-your-bookingspage
router.get('/listing/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.find({ user: id }).populate(['listing', 'donor']);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get your bookings details after clicking user-your-bookingspage cards in userpage
router.get('/your-bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate(['donor', 'listing']);
    res.status(200).json(order);
  } catch (errors) {
    res.status(400).json(errors);
  }
});

export default router;
