const userRouter = require('./user')
const bookRouter = require('./books')
const orderRouter = require('./orders')
module.exports = (app) => {
    const api = "/api/admin";
    app.use(api + "/user", userRouter);
    app.use(api + "/book", bookRouter);
    app.use(api + "/order", orderRouter);
}