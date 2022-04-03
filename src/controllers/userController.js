import userService from "../services/userService";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  const userData = await userService.handleLogin(email, password);

  return res.status(200).json({
    data: {
      ...userData,
      user: userData.user || {},
    },
  });
};

const handleGetUsers = async (req, res) => {
  const { id } = req.body;

  const users = await userService.handleGetUsers(id);

  if (!users && !users.length) {
    return res.status(500).json({
      errCode: 1,
      message: "Not user match!",
    });
  } else {
    return res.status(200).json({
      data: users,
    });
  }
};

const handleCreateNewUser = async (req, res) => {
  const { body } = req;
  const message = await userService.createNewUser(body);
  return res.status(200).json({ data: message });
};

const handleGetEditUser = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userInfo = await userService.getUserInfoById(userId);
    return res.status(200).json({
      data: userInfo,
    });
  } else {
    return res.status(200).json({
      data: {
        errCode: 1,
        message: "Missing parameter!",
      },
    });
  }
};

const handleEditUser = async (req, res) => {
  const data = req.body;
  const message = await userService.updateUserInfoById(data);
  return res.status(200).json({ data: message });
};

const handleDeleteUser = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(200).json({
      data: {
        errCode: 1,
        message: "Missing paramater!",
      },
    });
  } else {
    const message = await userService.deleteUserByID(id);
    return res.status(200).json({ data: message });
  }
};

module.exports = {
  handleLogin,
  handleGetUsers,
  handleCreateNewUser,
  handleEditUser,
  handleGetEditUser,
  handleDeleteUser,
};
