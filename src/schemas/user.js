import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  surname: String
}, { collection: 'users'} );

const User = mongoose.model('User', userSchema);
export default User;