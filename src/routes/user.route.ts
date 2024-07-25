import { Router } from "express"
import userController from "../controllers/user.controller"
import { jwtCheck, jwtParse } from "../middleware/auth"
import { validateMyUserRequest } from "../middleware/validation"

export const userRoute = Router()

userRoute.route("/").post(jwtCheck, userController.createUser)
userRoute.route("/").get(jwtCheck, jwtParse, userController.getUser)
userRoute
	.route("/")
	.put(jwtCheck, jwtParse, validateMyUserRequest, userController.updateUser)
