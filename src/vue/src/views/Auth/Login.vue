<template>
  <div class="login">
    <div class="container">
      <div class="login__container row">
        <div class="login__title col-12">{{ $t("login.login") }}</div>
        <div class="col-12 mt-4 mb-4">
          <div class="login__gg">
            <ion-icon name="logo-google"></ion-icon>
            Login with Google
          </div>
          <div class="line"></div>
        </div>
        <div class="form-group col-12">
          <label class="label__title" for="email">{{
            $t("login.email")
          }}</label>
          <input
            type="email"
            class="form-control"
            :placeholder="$t('login.enter-your-email')"
            name="email"
            v-model="email"
            @input="handleInputChange"
            @blur="handleInputBlur"
          />
          <div class="message--error">{{ emailError.message }}</div>
        </div>
        <div class="form-group form-password col-12">
          <label class="label__title" for="password">{{
            $t("login.password")
          }}</label>
          <div class="input__wrap">
            <input
              :type="inputType"
              class="form-control"
              :placeholder="$t('login.enter-your-password')"
              name="password"
              v-model="password"
              @input="handleInputChange"
              @blur="handleInputBlur"
            />
            <ion-icon
              @click="showPassword"
              class="icon__eye"
              name="eye-outline"
            ></ion-icon>
          </div>
          <div class="message--error">{{ passwordError.message }}</div>
        </div>
        <div class="custom-control custom-checkbox col-12">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customCheck1"
          />
          <label class="custom-control-label" for="customCheck1">{{
            $t("login.remember-me")
          }}</label>
        </div>
        <div class="col-12">
          <button class="btn btn-success btn-login" @click="submit">
            {{ $t("login.btn-login") }}
          </button>
        </div>
        <div class="col-12">
          <div class="forget">{{ $t("login.forgot-password") }}</div>
        </div>
        <div class="col-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      inputType: "password",
      emailError: {
        status: false,
        message: "",
      },
      passwordError: {
        status: false,
        message: "",
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions("login", ["login"]),
    async submit() {
      this.validate("email", this.email);
      this.validate("password", this.password);
      if (!this.email && !this.password) return;
      const data = {
        email: this.email,
        password: this.password,
      };
      await this.login(data);
    },
    showPassword() {
      this.inputType = this.inputType === "password" ? "text" : "password";
    },
    validate(type, value) {
      switch (type) {
        case "email":
          if (value) {
            //eslint-disable-next-line
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const error = !regex.test(value);
            this.emailError.status = error;
            this.emailError.message = error
              ? this.$t("login.invalid-email")
              : "";
          } else {
            this.emailError.status = true;
            this.emailError.message = this.$t("login.enter-your-email");
          }
          break;
        case "password":
          if (value) {
            const error = value.length < 6 ? true : false;
            this.passwordError.status = error;
            this.passwordError.message = error
              ? this.$t("login.invalid-password")
              : "";
          } else {
            this.passwordError.status = true;
            this.passwordError.message = this.$t("login.enter-your-password");
          }
          break;
      }
    },
    handleInputChange(e) {
      const { value, name } = e.target;
      this.validate(name, value);
    },
    handleInputBlur({ target }) {
      const { value, name } = target;
      this.validate(name, value);
    },
  },
};
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
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  background: #fff;
  backdrop-filter: blur(5px);
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2), 6px 10px 10px rgba(0, 0, 0, 0.2),
    12px 16px 10px rgba(0, 0, 0, 0.2);
}

.login__title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
  color: #333;
}

.login__gg {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  ion-icon {
    margin-right: 4px;
  }
}

.btn-login {
  display: block;
  width: 100%;
  margin: 1 6px auto 24px;
}

.custom-control.custom-checkbox {
  margin-bottom: 12px;
  margin-left: 15px;
}

.input__wrap {
  position: relative;

  .icon__eye {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

.label__title {
  color: #585858;
  font-weight: bold;
}

.line {
  padding-top: 20px;
  border-bottom: 1px solid #dcdcdc;
}

.forget {
  text-align: center;
  font-weight: bold;
  color: #003bff;
  padding-top: 20px;
  cursor: pointer;
  display: inline-block;
  margin: 0 auto;
  transition-duration: 0.2s;

  &:hover {
    text-decoration: underline;
  }
}

.message--error {
  color: #f11302;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 8px;
}
</style>
