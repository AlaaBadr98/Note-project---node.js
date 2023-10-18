import  { Router } from "express";
import * as userController from "./user.controller.js";
const userRouter =Router();

userRouter.post('/signUp',userController.signUp)
userRouter.post('/signIn',userController.signIn)
userRouter.get('/',userController.showAllUsers)





export default userRouter