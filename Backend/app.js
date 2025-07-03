const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const app = express();
require('dotenv').config();
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({origin:["http://localhost:5173"]}))
app.use(express.json())


app.use("/api/v1.users",userRouter);
app.use("/api/v1.category",categoryRouter);
app.use("/api/v1.transactions",transactionRouter);

app.use(errorHandler);     


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});