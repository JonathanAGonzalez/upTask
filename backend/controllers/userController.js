import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';
import User from '../models/user.js';

const createUser = async (req, res) => {
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
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error('User does not exist');
    return res.status(404).json({ msg: error.message });
  }

  //Compruebo si la contraseña es correcta
  if (await user.comparePassword(password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error('Incorrect password');
    return res.status(403).json({ msg: error.message });
  }

  res.send(user);
};

const confirmUser = async (req, res) => {
  const { token } = req.params;
  const userConfirmed = await User.findOne({ token });

  if (!userConfirmed) {
    return res.status(404).json({ msg: 'token fail' });
  }

  try {
    userConfirmed.confirm = true;
    userConfirmed.token = '';
    await userConfirmed.save();

    res.json({ msg: 'User confirmed' });
  } catch (error) {}
};

export { createUser, authUser, confirmUser };
