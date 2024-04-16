import express from 'express';
import Donor from '../../db/models/donorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import checkToken from '../../middlewares/checkToken.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const body = { ...req.body };
  const donor = await Donor.findOne({ email: body.email });
  if (donor) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  if (body.password != body.confirmpassword) {
    return res.status(400).json({ error: 'Password does not match' });
  }
  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;

  const newDonor = await Donor.create(body);
  return res
    .status(200)
    .json({ message: 'sign up successfull', donor: newDonor });
});
router.post('/login', async (req, res) => {
  const body = { ...req.body };
  const donor = await Donor.findOne({ email: body.email });
  if (!donor) {
    return res.status(400).json({ error: 'email or password incorrect' });
  }
  const isMatching = await bcrypt.compare(body.password, donor.password);
  if (!isMatching) {
    return res.status(400).json({ error: 'email or password incorrect' });
  }
  const key = process.env.SECRET_KEY;
  const token = jwt.sign({ role: 'DONOR', id: donor._id }, key, {
    expiresIn: '7d',
  });
  // console.log(isMatching);
  // console.log(token);
  res.status(200).json({ message: 'Login Successfull', token });
});

//donor by donorid

router.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findById(id);
    res.status(200).json(donor);
  } catch (error) {
    res.status(400).json({ error });
  }
});
router.patch('/profile/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    const donor = await Donor.findByIdAndUpdate(id, body);
    res.status(200).json(donor);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/addlisting', async (req, res) => {
  try {
    const body = { ...req.body };
    const donor = await Donor.create(body);
    res.status(200).json({ message: 'new List added', donor });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/addlisting/details/:id', async (req, res) => {
  const { id } = req.params;
  const donor = await Donor.findById(id);
  res.status(200).json(donor);
});
export default router;
