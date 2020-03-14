import jwt from 'jsonwebtoken';
import User from '../models/User';
import { string } from 'yup';
import testaCPF from '../helpers/cpf';
 

class UserController {
    constructor() {
        this.endPoints = [
            'cpf',
            'full-name',
            'birthday',
            'phone-number',
            'address',
            'amount-requested',
        ];
        this.addCpf = this.addCpf.bind(this);
        this.addBirthday = this.addBirthday.bind(this);
        this.addNames = this.addNames.bind(this);
    }
    
    getOrder(req) {
        return this.endPoints.indexOf(req.url.slice(1));
    }

    async getUser(token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id);
        return user;
    }

    async addCpf (req, res) {
        const schema = string().length(11).matches(/\d/g);
        const { token, data } = req.body;
        const order = this.getOrder(req);

        if (!await schema.isValid(data) || !testaCPF(data)) {
            res.status(400).json({success: false, error: 'Invalid CPF number'});
            return;
        }
        
        try {
            const user = await this.getUser(token);
            if (user) {
                if (user.endpoint_order - order >= 2) {
                    res.status(400).json({success: false, error: 'Wrong endpoint, out of order'});
                    return;
                } 
                await user.updateOne({cpf: data, endpoint_order: order}, {upsert: true});
                res.status(200).json({success: true, "next-end-point": this.endPoints[order + 1] });
            }   
        } catch (err) {
            res.status(400).json({success: false, error: err.message});
        }
    }

    async addNames(req, res) {
        const {data, token } = req.body;
        const order = this.getOrder(req);
        try {
            const user = await this.getUser(token);
            if (user) {
                if (user.endpoint_order - order >= 2) {
                    res.status(400).json({success: false, error: 'Wrong endpoint, out of order'});
                    return;
                } 
                await user.updateOne({full_name: `${data.firstName} ${data.lastName}`},{upsert: true});
                res.status(200).json({success: true, "next-end-point": this.endPoints[order + 1] });
            }
        } catch (err) {
            res.status(400).json({success: false, error: err.message});
        }
    }

    async addBirthday(req, res) {

    }
}

export default new UserController();