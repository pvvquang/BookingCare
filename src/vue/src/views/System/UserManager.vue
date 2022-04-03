<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table mt-5">
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
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("userManage", {
      listUser: "getListUser",
    }),
  },
  methods: {
    ...mapActions("userManage", ["getListUser"]),
    handleEditUser() {},
    handleDeleteUser() {},
  },
};
</script>

<style></style>
