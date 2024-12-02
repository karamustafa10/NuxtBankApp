import { defineStore } from "pinia";
import { ref } from "vue";
import type { People } from "~/models/people";

export const GetAllUsersStore = defineStore("getAllUsers", () => {
  const users = ref<People[]>([]);
  const userInfoStore = UserInfoStore();

  const fetchAllUsers = async () => {
    try {
      await userInfoStore.fetchUserInfo();
      const userId = userInfoStore.$state.userId;

      const response = await $fetch("/api/getAllUsers", {
        method: "POST",
        body: {
          id: userId,
        },
      });

      if (response) {
        users.value = response.map((user: any) => ({
          id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          mail: "",
          phone: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return {
    users,
    fetchAllUsers,
  };
});
