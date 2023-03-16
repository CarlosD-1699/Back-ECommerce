import express from "express";
import User from "../models/Users/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const users = await User.findOne({ email: req.body.email });
    if (users) {
      if (bcrypt.compareSync(req.body.password, users.password)) {
        res.send({
          _id: users.id,
          name: users.name,
          email: users.email,
          isAdmin: users.isAdmin,
          token: generateToken(users),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
export default userRouter;