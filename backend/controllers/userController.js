import generateId from '../helpers/generateId.js';
import User from '../models/user.js';

export default {
  createUser: async (req, res) => {
    const { email } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error('User already exist');
      return res.status(400).json({ msg: error.message });
    }

    try {
      const newUser = new User(req.body);

      newUser.token = generateId();

      await newUser.save();

      res.json({ msg: 'Usuario Creado' });
    } catch (error) {
      if (error.code === 11000) {
        res.send('El correo ya existe');
      }
    }
  },
};
