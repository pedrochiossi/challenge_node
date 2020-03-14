import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {

    async login(req, res) {
        const { email, password } = req.body;
    
        if (!email || !password ) {
            res.status(400).json({message: 'Empty fields, please fill email and password'});
            return;
        }
        try {
            const user = await User.findOne({email});
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword) {
                res.status(400).json({ message: 'Incorrect password' });
                return;
              }
            const token = jwt.sign({
                email: user.email,
                id: user._id,
            }, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '24h' });
            res.status(200).json({token})
        } catch (error) {
            res.status(400).json({message: 'Login failed with error', error: error.message});  
        }
    }

    async signup(req, res) {
        const { email, password } = req.body;
    
        if (!email || !password ) {
            res.status(400).json({message: 'Empty fields, please fill email and password'});
            return;
        } 
    
        const hasUser = await User.findOne({ email });
    
        if (hasUser) {
            res.status(400).json({ message: 'Email already taken, choose another' });
            return;
        }
    
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        
        await User.create({
            email,
            password: hashPass,
            endpoint_order: 0,
        });
        res.status(200).json({ message: 'New user was created' });    

    }
}

export default new SessionController();