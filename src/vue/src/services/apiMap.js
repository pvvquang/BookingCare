const api = (config) => ({
  login: (payload) => config("post", "login", payload),
  getListUser: () => config("get", "get-users"),
  createNewUser: (userInfo) => config("post", "create-new-user", userInfo),
  getEditUser: (id) => config("get", "get-edit-user", id),
  editUser: (userInfo) => config("put", "edit-user", userInfo),
  deleteUser: (id) => config("delete", "delete-user", id),
});

export default api;
