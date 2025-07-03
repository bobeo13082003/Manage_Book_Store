const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDb = require('./src/config/db')

const userRouter = require('./src/routers/user/index')
const authRouter = require('./src/routers/auth/index')
const adminRouter = require('./src/routers/admin/index')

require('dotenv').config();

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const slug = require('mongoose-slug-generator');
const { default: mongoose } = require('mongoose');

mongoose.plugin(slug);


userRouter(app)
authRouter(app)
adminRouter(app)

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});