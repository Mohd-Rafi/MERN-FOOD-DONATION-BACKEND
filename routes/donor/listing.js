import express from 'express';
import Donor from '../../db/models/donorSchema.js';
import checkToken from '../../middlewares/checkToken.js';
import Listing from '../../db/models/listingSchema.js';

const router = express.Router();

//create listing
router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
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

//get list details

router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(200).json(error);
  }
});

export default router;
