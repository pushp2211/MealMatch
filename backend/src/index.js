// order of imports matter, that's why dotenv need to be imported earlier than fns which use it
import dotenv from "dotenv";
dotenv.config({
    path: './env'
})

import connectDB from "./db/index.js";
import {app} from "./app.js" 

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})