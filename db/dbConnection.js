import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/food_donation')
  .then(() => {
    console.log('Db Connected');
  })
  .catch(e => console.log(e.message));

export default mongoose;
