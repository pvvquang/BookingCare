<template>
  <div class="container-fliud">
    <div class="row">
      <div class="col-12">MANAGE USERS</div>
      <div class="col-2 mt-4">
        <button class="btn btn-info" @click="handleClickShowModal">
          Add new user
        </button>
      </div>
      <div class="col-12">
        <table class="table mt-2">
          <thead class="thead-light">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in listUser" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ user.email }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.phonenumber }}</td>
              <td>{{ user.address }}</td>
              <td class="d-flex">
                <button
                  class="btn btn-primary mr-1"
                  @click="handleEditUser(user.id)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-danger"
                  @click="handleDeleteUser(user.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { TYPE_POPUP } from "../../constant/index";

const { POPUP_CREATE_NEW_USER, POPUP_EDIT_USER } = TYPE_POPUP;

export default {
  computed: {
    ...mapGetters("userManage", {
      listUser: "getListUser",
    }),
  },
  methods: {
    ...mapActions("userManage", ["getListUser", "deleteUser", "getEditUser"]),
    ...mapMutations("common", [
      "SET_OPEN_MODAL",
      "SET_TYPE_POPUP",
      "SHOW_TOAST_SUCCESS",
      "SHOW_TOAST_ERROR",
      "SET_OPEN_SPINNER",
      "SET_CLOSE_SPINNER",
    ]),
    async handleEditUser(id) {
      const isUser = await this.getEditUser({ id });
      if (isUser) {
        this.SET_TYPE_POPUP(POPUP_EDIT_USER);
      }
    },
    async handleDeleteUser(id) {
      if (id) {
        this.SET_OPEN_SPINNER();
        await this.deleteUser({ id });
        await this.getListUser();
        this.SET_CLOSE_SPINNER();
      }
    },
    handleClickShowModal() {
      this.SET_TYPE_POPUP(POPUP_CREATE_NEW_USER);
    },
  },
};
</script>

<style></style>
