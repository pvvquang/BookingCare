import bcrypt from "bcrypt";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("Create successa new user!");
    } catch (e) {
      reject(e);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resole, reject) => {
    try {
      const users = await db.User.findAll({ raw: true });
      resole(users);
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
          res(user);
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
      });
      if (user) {
        user.firstName = userInfo.firstName;
        user.lastName = userInfo.lastName;
        user.address = userInfo.address;

        await user.save();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUserByID = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await db.User.findOne({ where: { id } });
      if (user) {
        await user.destroy();
      }
      res();
    } catch (e) {
      rej(e);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserInfoById,
  deleteUserByID,
};
