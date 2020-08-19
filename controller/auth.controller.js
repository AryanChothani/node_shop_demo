const db = require("../models");
// const config = require("../config/db.config.js");
const User = db.user;
const Role = db.role;
require('dotenv').config();
const Op = db.Sequelize.Op;
const errors = require('../config/errors');
const error = errors.errors;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  try {
    // Save User to Database
    User.create({
      name: req.body.name,
      email: req.body.email,
      mo_no: req.body.mo_no,
      city: req.body.city,
      password: bcrypt.hashSync(req.body.password, 8),
      user_type: "admin"
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.status(200).send(error.OK)
            });
          });
        } else {
          // user admin role = 1
          user.setRoles([1]).then(() => {
            res.status(200).send(error.OK)
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(error.SERVER_ERROR)
      });
  } catch (e) {
    console.log(e);
    res.status(500).send(error.SERVER_ERROR)
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send(error.USER_NOT_PRESENT);
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(422).send(error.PASSWORD_MISSMATCH, {
          accessToken: null
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.secret, {
        expiresIn: 86400 // 24 hours
      });

      const authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(error.SERVER_ERROR);
    });
};