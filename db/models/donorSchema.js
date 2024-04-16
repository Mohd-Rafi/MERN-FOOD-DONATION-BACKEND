import { Schema, model } from 'mongoose';

const schema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Donor = model('Donor', schema);

export default Donor;
