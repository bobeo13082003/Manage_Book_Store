const userAuthRouter = require('./userAuth')
module.exports = (app) => {
    const api = "/api/user";
    app.use(api + "/auth", userAuthRouter);
}