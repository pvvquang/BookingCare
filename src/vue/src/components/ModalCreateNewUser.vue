<template>
  <Modal>
    <div class="container">
      <div class="row justify-center">
        <div
          class="col-12 text-center mt-4 mb-4 text-uppercase font-weight-bold"
        >
          Create a new user
        </div>
        <div class="col-12">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail">Email</label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="inputEmail"
                placeholder="Email"
                @input="handleInputChange"
                @blur="handleBlur"
                v-model="dataForm.email"
              />
              <div class="message--error">{{ errorMessage.email }}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword">Password</label>
              <input
                type="password"
                name="password"
                class="form-control"
                id="inputPassword"
                placeholder="Password"
                @input="handleInputChange"
                @blur="handleBlur"
                v-model="dataForm.password"
              />
              <div class="message--error">{{ errorMessage.password }}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputFirstName">First Name</label>
              <input
                type="text"
                name="firstName"
                class="form-control"
                id="inputFirstName"
                placeholder="First Name"
                @input="handleInputChange"
                @blur="handleBlur"
                v-model="dataForm.firstName"
              />
              <div class="message--error">{{ errorMessage.firstName }}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputLastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                class="form-control"
                id="inputLastName"
                placeholder="Last Name"
                @input="handleInputChange"
                @blur="handleBlur"
                v-model="dataForm.lastName"
              />
              <div class="message--error">{{ errorMessage.lastName }}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input
              type="text"
              name="address"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              @input="handleInputChange"
              @blur="handleBlur"
              v-model="dataForm.address"
            />
            <div class="message--error">{{ errorMessage.address }}</div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputPhoneNumber">Phone Number</label>
              <input
                type="text"
                name="phonenumber"
                class="form-control"
                id="inputPhoneNumber"
                placeholder="VD: 0123456789"
                @input="handleInputChange"
                @blur="handleBlur"
                v-model="dataForm.phonenumber"
              />
              <div class="message--error">{{ errorMessage.phonenumber }}</div>
            </div>
            <div class="form-group col-md-4">
              <label for="inputGender">Gender</label>
              <select
                id="inputGender"
                name="gender"
                class="form-control"
                @input="handleInputChange"
                @blur="handleBlur"
                v-model="dataForm.gender"
              >
                <option :value="null">Choose...</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
              <div class="message--error">{{ errorMessage.gender }}</div>
            </div>
            <div class="form-group col-md-4">
              <label for="inputRole">Role</label>
              <select
                id="inputRole"
                name="roleId"
                class="form-control"
                @input="handleInputChange"
                @blur="handleBlur"
                v-model="dataForm.roleId"
              >
                <option :value="null">Choose...</option>
                <option value="0">Admin</option>
                <option value="1">Doctor</option>
                <option value="2">Patient</option>
              </select>
              <div class="message--error">{{ errorMessage.roleId }}</div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" @click="submit">
            Add User
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import utils from "../utils/index";

export default {
  components: { Modal },
  data() {
    return {
      dataForm: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: null,
        gender: null,
        roleId: null,
      },
      errorMessage: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: null,
        gender: null,
        roleId: null,
      },
    };
  },
  watch: {
    isOpenModal(val) {
      if (!val) {
        this.dataForm.email = "";
        this.dataForm.password = "";
        this.dataForm.firstName = "";
        this.dataForm.lastName = "";
        this.dataForm.phonenumber = "";
        this.dataForm.address = "";
        this.dataForm.roleId = null;
        this.dataForm.gender = null;

        this.errorMessage.email = "";
        this.errorMessage.password = "";
        this.errorMessage.firstName = "";
        this.errorMessage.lastName = "";
        this.errorMessage.phonenumber = "";
        this.errorMessage.address = "";
        this.errorMessage.roleId = "";
        this.errorMessage.gender = "";
      }
    },
  },
  computed: {
    ...mapState("common", ["isOpenModal"]),
  },
  methods: {
    ...mapActions("userManage", ["createNewUser", "getListUser"]),
    ...mapMutations("common", [
      "SET_OPEN_SPINNER",
      "SET_CLOSE_SPINNER",
      "SET_CLOSE_MODAL",
    ]),
    async submit() {
      this.validate();
      if (
        this.dataForm.email &&
        this.dataForm.password &&
        this.dataForm.firstName &&
        this.dataForm.lastName &&
        this.dataForm.address &&
        this.dataForm.phonenumber &&
        this.dataForm.gender &&
        this.dataForm.roleId
      ) {
        this.SET_OPEN_SPINNER();
        await this.createNewUser(this.dataForm);
        await this.getListUser();
        this.SET_CLOSE_MODAL();
        this.SET_CLOSE_SPINNER();
      }
    },
    handleInputChange(e) {
      const { value, name } = e.target;
      this.validate(name, value);
    },
    handleBlur(e) {
      const { value, name } = e.target;
      this.validate(name, value);
    },
    validate(type, value) {
      switch (type) {
        case "email": {
          const error = utils.validateEmailPassword("email", value);
          this.errorMessage.email = error.message;
          break;
        }
        case "password": {
          const error = utils.validateEmailPassword("password", value);
          this.errorMessage.password = error.message;
          break;
        }
        case "firstName":
          this.errorMessage.firstName = !value
            ? this.$t("common.error-message")
            : "";
          break;
        case "lastName":
          this.errorMessage.lastName = !value
            ? this.$t("common.error-message")
            : "";
          break;
        case "address":
          this.errorMessage.address = !value
            ? this.$t("common.error-message")
            : "";
          break;
        case "phonenumber":
          this.errorMessage.phonenumber = !value
            ? this.$t("common.error-message")
            : "";
          break;
        case "gender":
          this.errorMessage.gender = !value
            ? this.$t("common.error-message")
            : "";
          break;
        case "roleId":
          this.errorMessage.roleId = !value
            ? this.$t("common.error-message")
            : "";
          break;
        default:
          this.errorMessage.email =
            this.errorMessage.password =
            this.errorMessage.firstName =
            this.errorMessage.lastName =
            this.errorMessage.address =
            this.errorMessage.phonenumber =
            this.errorMessage.gender =
            this.errorMessage.roleId =
              this.$t("common.error-message");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  text-align: left;
  label {
    font-weight: bold;
  }
}
.message--error {
  color: #f11302;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 8px;
}
</style>
