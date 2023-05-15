const { Router } = require("express");
const UserModel = require("../Models/user");
const authrouter = Router();
const bcrypt = require("bcrypt");
const moment = require("moment");
//
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);
const jwt = require('jsonwebtoken');
//

authrouter.post("/user/signup", async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // email should not exist alreday

  const newUser = new UserModel({
    email: req.body.email,
    password: hashedPassword
  });

  newUser
    .save()
    .then(() => {
      res.send({ code: 200, message: "Signup success" });
    })
    .catch((err) => {
      res.send({ code: 500, message: "Signup Err" });
    });
});
authrouter.post("/user/login", async (req, res) => {
  console.log(req.body.email);

  // email and password match

 

  UserModel.findOne({ email: req.body.email })
    .then(async (result) => {
      console.log(result, "11");
      const bcryptedData = await bcrypt.compare(
        req.body.password,
        result.password
      );
      console.log("bcryptedData", bcryptedData);

      

      if (bcryptedData) {
        //
        const token = jwt.sign({ email: result.email }, secretKey, { expiresIn: '1h' });
        //
        res.send({
          email: result.email,
          code: 200,
          message: "user Found",
          token: token,
        }); 
        
      } else {
        res.send({ code: 404, message: "password wrong" });
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
});

module.exports = authrouter;
