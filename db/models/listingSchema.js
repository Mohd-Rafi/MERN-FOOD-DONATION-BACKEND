import { Schema, model } from 'mongoose';

const schema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    category: [
      {
        type: String,
        enum: ['Veg', 'Non Veg', 'Others'],
      },
    ],
    startTime: {
      type: String,
      trim: true,
      required: true,
    },
    endTime: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['FREE', 'BOOKED', 'NOT AVAILALBE'],
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: 'Donor',
    },
    headCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Listing = model('Listing', schema);

export default Listing;
