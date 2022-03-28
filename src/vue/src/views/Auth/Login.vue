<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="login__container col-12">
          <div class="login__title">Login</div>
          <div class="form-group col-12">
            <label for="">UserName</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your username"
            />
          </div>
          <div class="form-group col-12">
            <label for="">Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter your password"
            />
          </div>
          <button class="btn btn-success btn-login">Login</button>
          <div class="col-12">
            <span>Forgot your password?</span>
          </div>
          <div class="col-12"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffd1b7;
}

.login__container {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
  padding: 32px 16px;
  border-radius: 30px;
  border: 1px solid #dcdcdc;
  background: #fff;
  backdrop-filter: blur(5px);
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2), 6px 10px 10px rgba(0, 0, 0, 0.2),
    12px 16px 10px rgba(0, 0, 0, 0.2);
}

.login__title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
  text-transform: uppercase;
  color: #333;
}

.btn-login {
  display: block;
  margin: 12px auto 24px;
}
</style>
