import { userModel } from "../../../database/models/user.models.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchError } from "../../catchError.js";
import { AppError } from "../../app.error.js";

const signUp = catchError(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    throw new AppError("User already Exist ", 409);
  }

  const hash = bcrypt.hashSync(password, 8);
  await userModel.insertMany({
    name,
    email,
    password: hash,
  });

  res.json({
    message: "Done ",
  });
});

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email:email });
  console.log("user :", user);
  if (!user) {
    throw new AppError("Email Not Exist", 404);
  }
  const truePass = await bcrypt.compare(password, user.password);
  console.log(truePass);
  if (!truePass) {
    throw new AppError("invalid password", 401);
  }
  let token = jwt.sign({ id: user.id, name: user.name }, "myNameIsAhmed");
  res.json({ message: "Ya Welcome", token });
};

const showAllUsers = async (req, res) => {
  const users = await userModel.find(
    {},
    {
      name: 1,
      _id: 0,
    }
  );
  res.json({
    message: users,
  });
};

export { signUp, signIn, showAllUsers };
