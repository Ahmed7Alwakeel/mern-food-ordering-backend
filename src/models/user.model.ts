import mongoose, { Query } from "mongoose"
import IUser from "../interfaces/user.interface"

const userSchema = new mongoose.Schema<IUser>({
	auth0Id: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
	},
	addressLine1: {
		type: String,
	},
	city: {
		type: String,
	},
	country: {
		type: String,
	},
})

userSchema.pre(/^find/, function (this: Query<IUser, IUser[]>, next) {
	this.select("-__v")
	next()
})

const userModel = mongoose.model("User", userSchema)

export default userModel
