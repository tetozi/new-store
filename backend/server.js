import mongoose from "mongoose";
import app from './app.js'
import dotenv from 'dotenv';
dotenv.config({ path: "./config.env" })





const DB = process.env.DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection is successfull");
  });


const port = process.env.PORT || 4242;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});