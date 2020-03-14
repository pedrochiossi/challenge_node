import mongoose, { model } from 'mongoose';

const { Schema }  = mongoose;

const userSchema = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        cpf: String,
        full_name: String,
        birthday: String,
        phone_number: Number,
        address: {
            cep: Number,
            street: String,
            number: Number,
            complement: String,
            city: String,
            state: String,
        },
        endpoint_order: {type: Number, required: true},
    },
    {
        timestamps: true,
    },

);

const User = model("User", userSchema);

export default User;