const userRouter = require('./user')
const bookRouter = require('./books')
const orderRouter = require('./orders')
const dashboardRouter = require('./statistic')
module.exports = (app) => {
    const api = "/api/admin";
    app.use(api + "/user", userRouter);
    app.use(api + "/book", bookRouter);
    app.use(api + "/order", orderRouter);
    app.use(api + "/dashboard", dashboardRouter);
}