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
    ...userData,
    user: userData.user || {},
  });
};

const handleGetUsers = async (req, res) => {
  const { id } = req.body;

  const users = await userService.handleGetUsers(id);
  console.log(users);

  if (!users && !users.length) {
    return res.status(500).json({
      errCode: 1,
      message: "Not user match!",
    });
  } else {
    return res.status(200).json({
      users,
    });
  }
};

module.exports = {
  handleLogin,
  handleGetUsers,
};
