<template>
  <div class="container">
    <div class="row justify-center">
      <div class="col-12 text-center mt-4 mb-1 text-uppercase font-weight-bold">
        Create a new user
      </div>
      <div class="col-10 offset-1">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail">Email</label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="inputEmail"
              placeholder="Email"
              v-model="formData.email"
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
              v-model="formData.password"
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
              v-model="formData.firstName"
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
              v-model="formData.lastName"
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
            v-model="formData.address"
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
              v-model="formData.phonenumber"
            />
            <div class="message--error">{{ errorMessage.phonenumber }}</div>
          </div>
          <div class="form-group col-md-4">
            <label for="inputGender">Gender</label>
            <select
              id="inputGender"
              name="gender"
              class="form-control"
              v-model="formData.gender"
            >
              <option selected>Choose...</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
            <div class="message--error">{{ errorMessage.gender }}</div>
          </div>
          <div class="form-group col-md-4">
            <label for="inputRole">Role</label>
            <select
              id="inputRole"
              name="role"
              class="form-control"
              v-model="formData.roleId"
            >
              <option selected>Choose...</option>
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
</template>

<script>
import { mapActions } from "vuex";

export default {
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
  methods: {
    ...mapActions("userManage", ["createNewUser"]),
    async submit() {
      if (!this.dataForm.email) {
        this.errorMessage.email = this.$t("common.error-message");
      } else if (!this.dataForm.password) {
        this.errorMessage.password = this.$t("common.error-message");
      } else if (!this.dataForm.firstName) {
        this.errorMessage.firstName = this.$t("common.error-message");
      } else if (!this.dataForm.lastName) {
        this.errorMessage.lastName = this.$t("common.error-message");
      } else if (!this.dataForm.address) {
        this.errorMessage.address = this.$t("common.error-message");
      } else if (!this.dataForm.phonenumber) {
        this.errorMessage.phonenumber = this.$t("common.error-message");
      } else if (!this.dataForm.gender) {
        this.errorMessage.gender = this.$t("common.error-message");
      } else if (!this.dataForm.roleId) {
        this.errorMessage.roleId = this.$t("common.error-message");
      } else {
        // await this.createNewUser(this.dataForm);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message--error {
  color: #f11302;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 8px;
}
</style>
