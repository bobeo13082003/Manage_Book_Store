const userRouter = require('./user')
const bookRouter = require('./books')
module.exports = (app) => {
    const api = "/api/admin";
    app.use(api + "/user", userRouter);
    app.use(api + "/book", bookRouter);
}