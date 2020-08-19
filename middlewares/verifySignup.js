const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const errors = require('../config/errors');
const error = errors.errors;

checkDuplicateNameOrEmail = (req, res, next) => {
  // Name
  User.findOne({
    where: {
      name: req.body.name,
      user_type: "admin"
    }
  }).then(user => {
    if (user) {
      res.status(402).send(error.NAME_ALREADY_EXITS);
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(402).send(error.EMAIL_ID_ALREADY_EXITS);
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send(error.ROLE_NOT_PRESENT);
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateNameOrEmail: checkDuplicateNameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;