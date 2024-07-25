import { auth } from "express-oauth2-jwt-bearer"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model"

declare global {
	namespace Express {
		interface Request {
			userId: string
			auth0Id: string
		}
	}
}

export const jwtCheck = auth({
	audience: "mern-food-ordering-api",
	issuerBaseURL: "https://dev-pumnpofp3h3biyt0.us.auth0.com/",
	tokenSigningAlg: "RS256",
})

export const jwtParse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization || !authorization.startsWith("Bearer ")) {
		return res.sendStatus(401)
	}

	// Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
	const token = authorization.split(" ")[1]

	try {
		const decoded = jwt.decode(token) as jwt.JwtPayload
		const auth0Id = decoded.sub

		const user = await userModel.findOne({ auth0Id })

		if (!user) {
			return res.sendStatus(401)
		}

		req.auth0Id = auth0Id as string
		req.userId = user._id.toString()
		next()
	} catch (error) {
		return res.sendStatus(401)
	}
}
