<template>
  <Modal>
    <div class="container">
      <div class="row justify-center">
        <div
          class="col-12 text-center mt-4 mb-4 text-uppercase font-weight-bold"
        >
          Edit User
        </div>
        <div class="col-12">
          <div class="form-row">
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
          <button type="submit" class="btn btn-primary" @click="submit">
            Edit User
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: { Modal },
  data() {
    return {
      dataForm: {
        id: "",
        firstName: "",
        lastName: "",
        address: "",
      },
      errorMessage: {
        firstName: "",
        lastName: "",
        address: "",
      },
    };
  },
  watch: {
    isOpenModal(val) {
      if (!val) {
        this.dataForm.firstName = "";
        this.dataForm.lastName = "";
        this.dataForm.address = "";

        this.errorMessage.firstName = "";
        this.errorMessage.lastName = "";
        this.errorMessage.address = "";
      }
    },
  },
  created() {
    this.dataForm.id = this.userEditInfo.id;
    this.dataForm.firstName = this.userEditInfo.firstName;
    this.dataForm.lastName = this.userEditInfo.lastName;
    this.dataForm.address = this.userEditInfo.address;
  },
  computed: {
    ...mapState("common", ["isOpenModal"]),
    ...mapState("userManage", ["userEditInfo"]),
  },
  methods: {
    ...mapActions("userManage", ["editUser", "getListUser"]),
    ...mapMutations("common", [
      "SET_OPEN_SPINNER",
      "SET_CLOSE_SPINNER",
      "SET_TYPE_POPUP",
    ]),
    async submit() {
      this.validate();
      if (
        this.dataForm.firstName &&
        this.dataForm.lastName &&
        this.dataForm.address
      ) {
        this.SET_OPEN_SPINNER();
        await this.editUser(this.dataForm);
        await this.getListUser();
        this.SET_TYPE_POPUP(null);
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
        default:
          this.errorMessage.firstName =
            this.errorMessage.lastName =
            this.errorMessage.address =
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
