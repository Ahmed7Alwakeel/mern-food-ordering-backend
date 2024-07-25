import express, { Request, Response } from "express"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import cors from "cors"
import mongoSanitize from "express-mongo-sanitize"
import { userRoute } from "./routes/user.route"
import AppError from "./utils/appError"
import errorController from "./controllers/error.controller"

dotenv.config()
export const app = express()
app.use(cors())
app.use(
	helmet({
		hsts: false,
		crossOriginResourcePolicy: false, //for images at frontend
	})
)
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests, please try again in an hour!",
})
app.use("/api", limiter)
app.use(express.json())
app.use(mongoSanitize())
app.use(express.static("src/public"))
app.use("/health", (async(req:Request,res:Response)=>{
res.send({message:"Health ok!"})
}))
app.use("/api/user", userRoute)

app.all(
	"*",
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		next(new AppError("Not Found", "FAIL", 404))
	}
)

//when pass that four params express knows that this entire function is an error handling middleware
app.use(errorController)
