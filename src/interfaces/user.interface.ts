export default interface IUser extends Document {
	name: string
	password: string
	passwordConfirm?: string
	email: string
	mobile: string
	auth0Id:string
	addressLine1: string
	city: string
	country: string
}
