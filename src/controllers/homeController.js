import db from "../models/index";
import CRUDService from "../services/CRUDService";

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll({ raw: true });
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  const { body } = req;
  await CRUDService.createNewUser(body);
  return res.redirect("/get-crud");
};

const displayGetCRUD = async (req, res) => {
  const data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userInfo = await CRUDService.getUserInfoById(userId);

    return res.render("editCRUD.ejs", {
      userInfo,
    });
  } else {
    return res.send("User not found!");
  }
};

const putEditCRUD = async (req, res) => {
  const data = req.body;
  await CRUDService.updateUserInfoById(data);
  res.redirect("/get-crud");
};

const deleteCRUD = async (req, res) => {
  const id = req.query.id;
  await CRUDService.deleteUserByID(id);
  res.redirect("/get-crud");
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putEditCRUD,
  deleteCRUD,
};
