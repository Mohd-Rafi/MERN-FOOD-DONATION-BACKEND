import express from 'express';
import Donor from '../../db/models/donorSchema.js';
import checkToken from '../../middlewares/checkToken.js';
import Listing from '../../db/models/listingSchema.js';
import User from '../../db/models/userSchema.js';
import Order from '../../db/models/orderSchema.js';

const router = express.Router();

//create listing
router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // const order = await Order.create({ status: 'Free' });
    const listing = await Listing.create(body);
    res.status(200).json(listing);
  } catch (error) {
    res.status(200).json(error);
  }
});

//get listing in donor home
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.find({ donor: id });
    res.status(200).json(listing);
  } catch (error) {
    res.status(200).json(error);
  }
});

//get listdetails after clicking donor home card

router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(200).json(error);
  }
});

//get list details by reciever

router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('donor');
    res.status(200).json(listings);
  } catch (error) {
    res.status(200).json(error);
  }
});

//get list details by reciever by id

router.get('/donation/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listings = await Listing.findById(id).populate('donor');
    res.status(200).json(listings);
  } catch (error) {
    res.status(200).json(error);
  }
});

//delete listing in listing details screen
router.delete('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(200).json(error);
  }
});

export default router;
