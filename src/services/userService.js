import db from "../models/index";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import { hashUserPassword } from "./CRUDService";

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

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await checkUserEmail(data.email);
      if (!checkEmail) {
        resolve({
          errCode: 1,
          message: "Your email is readly in used. Please try another email!",
        });
      } else {
        const hashPasswordFromBcryt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcryt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.role,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

function getUserInfoById(userId) {
  return new Promise((res, rej) => {
    try {
      let userInfo = new Promise((res, rej) => {
        const user = db.User.findOne({ where: { id: userId } });
        if (user) {
          res({
            errCode: 0,
            message: "OK",
          });
        } else {
          rej("user not have");
        }
      });

      res(userInfo);
    } catch (e) {
      rej(e);
    }
  });
}

const updateUserInfoById = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userInfo.id },
        raw: false,
      });
      if (user) {
        user.firstName = userInfo.firstName;
        user.lastName = userInfo.lastName;
        user.address = userInfo.address;
        await user.save();
        resolve({
          errCode: 0,
          message: "OK",
        });
      } else {
        resolve({
          errCode: 2,
          message: "The user is not exits!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUserByID = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await db.User.findOne({ where: { id }, raw: false });
      if (user) {
        await user.destroy();
        res({
          errCode: 0,
          message: "OK",
        });
      } else {
        res({
          errCode: 2,
          message: "The user is not exits!",
        });
      }
    } catch (e) {
      rej(e);
    }
  });
};

module.exports = {
  handleLogin,
  checkUserEmail,
  handleGetUsers,
  createNewUser,
  getUserInfoById,
  updateUserInfoById,
  deleteUserByID,
};
