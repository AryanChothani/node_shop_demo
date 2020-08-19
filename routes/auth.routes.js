
const { verifySignUp } = require("../middlewares");
const controller = require("../controller/auth.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
};











// module.exports = (app) => {
//     const user = require('../controller/authController.js');

//     var router = require("express").Router();

//     router.post('/signup', user.signup);

//     router.get('/signin', user.signin);

//     app.use('/api/user', router);

// }