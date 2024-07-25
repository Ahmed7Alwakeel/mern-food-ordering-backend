import { Response, Request } from "express"
import { catchAsync } from "../utils/catchAsync"
import userModel from "../models/user.model"

class User {
	createUser = catchAsync(async (req: Request, res: Response) => {
		const user = await userModel.create({ ...req.body })
		res.status(200).json({
			status: "success",
			data: user,
		})
	})

    getUser = catchAsync(async (req: Request, res: Response) => {
		const user = await userModel.findOne({ _id: req.userId })
		res.status(200).json({
			status: "success",
			data: user,
		})
	})

	updateUser = catchAsync(async (req: Request, res: Response) => {
		const { name, addressLine1, country, city } = req.body
		const user = await userModel.findById(req.userId)

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		user.name = name
		user.addressLine1 = addressLine1
		user.city = city
		user.country = country

		await user.save()

		res.send(user)
	})
}
export default new User()
