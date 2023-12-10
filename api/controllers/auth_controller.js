import User from "../models/UserModel.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = await req.body.password;
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("New user has been created!");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) next(createError(404, "User not found!"));

    const reqPass = req.body.password;
    const isCorrectPassword = await bcrypt.compare(reqPass, user.password);
    if (!isCorrectPassword) return next(createError(400, "Wrong password!"));

    const { password, isAdmin, ...other} = user._doc;
    res.status(200).send({...other});
  } catch (error) {
    next(error);
  }
};
