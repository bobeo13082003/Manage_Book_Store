const userRouter = require('./user')
module.exports = (app) => {
    const api = "/api/admin";
    app.use(api + "/user", userRouter);
}