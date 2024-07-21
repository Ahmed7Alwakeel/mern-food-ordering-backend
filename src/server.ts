import mongoose from "mongoose"
import { app } from "./app"

mongoose
	.connect(process.env.MONGO_LOCAL_URL as string || "")
	.then(() => console.log("RunningDB"))
//to access .env file and read value inside it
const server = app.listen(process.env.PORT, () => console.log("RunningSERVER"))