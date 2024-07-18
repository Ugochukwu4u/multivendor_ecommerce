const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  dotenv  = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

dotenv.config();
const app = express();
const  port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB).then(()=>console.log('Database Connected Sucessfully'));
};

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port,()=>{
    console.log('Api connected successfully');
})
