import express, { Request, Response } from "express"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize"

dotenv.config()
export const app = express()
app.use(cors());
app.use(helmet({
	hsts: false,
	crossOriginResourcePolicy: false, //for images at frontend
}))
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests, please try again in an hour!",
})
app.use("/api", limiter)
app.use(express.json())
app.use(mongoSanitize())
app.use(express.static('src/public'));
app.get("/test",async(req:Request,res:Response)=>{
    res.json({message:"test1"})
})

app.listen(2000,()=>{

})