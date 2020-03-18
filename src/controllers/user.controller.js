import { string } from 'yup';
import User from '../models/User';
import testaCPF from '../helpers/cpf';
import validateAddress from '../helpers/cep';


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
    this.addPhoneNumber = this.addPhoneNumber.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.addRequestedAmount = this.addRequestedAmount.bind(this);
  }

  getOrder(req) {
    return this.endPoints.indexOf(req.url.slice(1)) + 1;
  }


  async addCpf(req, res) {
    const schema = string().length(11).matches(/\d/g);
    const { data } = req.body;
    const order = this.getOrder(req);

    if (!await schema.isValid(data) || !testaCPF(data)) {
      res.status(400).json({ success: false, error: 'Invalid CPF number' });
      return;
    }

    try {
      const user = await User.findById(req.user.id);
      if (user) {
        await user.updateOne({ cpf: data, endpoint: order });
        res.status(200).json({
          success: true,
          'next-end-point': order < this.endPoints.length ? this.endPoints[order] : '',
        });
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  async addNames(req, res) {
    const { data } = req.body;
    const order = this.getOrder(req);
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        if (order - user.endpoint >= 2) {
          res.status(400).json({ success: false, error: 'Endpoint out of order' });
          return;
        }
        await user.updateOne({ full_name: `${data.firstName} ${data.lastName}`, endpoint: order });
        res.status(200).json({
          success: true,
          'next-end-point': order < this.endPoints.length ? this.endPoints[order] : '',
        });
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  async addBirthday(req, res) {
    const { data } = req.body;
    const order = this.getOrder(req);
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        if (order - user.endpoint >= 2) {
          res.status(400).json({ success: false, error: 'Endpoint out of order' });
          return;
        }
        await user.updateOne({ birthday: data, endpoint: order });
        res.status(200).json({
          success: true,
          'next-end-point': order < this.endPoints.length ? this.endPoints[order] : '',
        });
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  async addPhoneNumber(req, res) {
    const { data } = req.body;
    const order = this.getOrder(req);
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        if (order - user.endpoint >= 2) {
          res.status(400).json({ success: false, error: 'Endpoint out of order' });
          return;
        }
        const count = await User.countDocuments({ phone_number: data });
        if (count < 2) {
          await user.updateOne({ phone_number: data, endpoint: order });
          res.status(200).json({
            success: true,
            'next-end-point': order < this.endPoints.length ? this.endPoints[order] : '',
          });
        } else {
          res.status(400).json({ success: false, error: 'Number already used in another profile' });
        }
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  async addRequestedAmount(req, res) {
    const { data } = req.body;
    const order = this.getOrder(req);
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        if (order - user.endpoint >= 2) {
          res.status(400).json({ success: false, error: 'Endpoint out of order' });
          return;
        }
        await user.updateOne({ requested_amount: data, endpoint: order });
        res.status(200).json({
          success: true,
          'next-end-point': order < this.endPoints.length ? this.endPoints[order] : '',
        });
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  async addAddress(req, res) {
    const { data } = req.body;
    const order = this.getOrder(req);

    if (!await validateAddress(data)) {
      res.status(400).json({ success: false, error: 'Invalid Address' });
      return;
    }
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        if (order - user.endpoint >= 2) {
          res.status(400).json({ success: false, error: 'Endpoint, out of order' });
          return;
        }
        const count = await User.countDocuments({ address: data });
        if (count < 2) {
          await user.updateOne({ address: data, endpoint: order });
          res.status(200).json({
            success: true,
            'next-end-point': order < this.endPoints.length ? this.endPoints[order] : '',
          });
        } else {
          res.status(400).json({ success: false, error: 'Address already used in another profile' });
        }
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}

export default new UserController();
