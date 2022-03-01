import mongoose from 'mongoose';
import brcrypt from 'bcrypt';

const userScheema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userScheema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await brcrypt.genSalt(10);

  this.password = await brcrypt.hash(this.password, salt);

  next();
});

userScheema.methods.comparePassword = async function (password) {
  return await brcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userScheema);

export default User;
