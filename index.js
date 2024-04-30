// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.configDotenv({
    path : './env'
}) 

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("CONNECTION FAILED !!!",err);
})















// import express from "express"
// const app = express();

// ( async () => {
//     try {
//         await mongoose.connect()

//         app.on("error",(error)=>{
//             console.log("error",error);
//             throw error

//         })

//         app.listen(process.env.PORT , () => {
//             console.log(`app is listening on the port ${process.env.PORT}`);
//         })
        
//     } catch (error) {
//         console.error("ERROR",error);
//     }
// })()