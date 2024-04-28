import { Schema, model } from 'mongoose';

const schema = Schema({
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
  },
});

const Order = model('Order', schema);

export default Order;
