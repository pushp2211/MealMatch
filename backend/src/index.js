// order of imports matter, that's why dotenv need to be imported earlier than fns which use it
import dotenv from "dotenv";
dotenv.config({
    path: './env'
})

import connectDB from "./db/index.js";
import { app } from "./app.js"

import cron from "node-cron";
import { runFoodExpiryJob } from "./jobs/foodExpiry.job.js";

connectDB()
    .then(() => {
        // --- SCHEDULE THE JOB HERE ---
        // Run every hour at minute 0 (e.g., 1:00, 2:00, 3:00...)
        cron.schedule("0 * * * *", async () => {
            console.log("Running scheduled food expiry check...");
            await runFoodExpiryJob();
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })