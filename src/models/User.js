import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    full_name: String,
    birthday: String,
    phone_number: Number,
    address: {
      cep: String,
      street: String,
      number: Number,
      complement: String,
      city: String,
      state: String,
    },
    requested_amount: Number,
    endpoint: {type: Number, required: true },
  },
  {
    timestamps: true,
  },

);

const User = model('User', userSchema);

export default User;
