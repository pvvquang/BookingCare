import db from "../models/index";
import bcrypt from "bcrypt";

const handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      const isUserEmail = await checkUserEmail(email);
      if (isUserEmail) {
        const user = await db.User.findOne({
          where: { email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        if (user) {
          const checkPassword = await bcrypt.compareSync(
            password,
            user.password
          );

          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Password wrong!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User's not found!";
        }

        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Your's Email isn't exist in your system. Please try other email";
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { email } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleGetUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users;
      if (id) {
        users = await db.User.findOne({ where: { id } });
      } else {
        users = await db.User.findAll();
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLogin,
  checkUserEmail,
  handleGetUsers,
};
