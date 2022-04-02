const api = (config) => ({
  login: (payload) => config("post", "login", payload),
});

export default api;
