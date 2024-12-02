import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { UserInfoStore } from "./userInfoStore";
import type { People } from "~/models/people";

export const GetUserWithIdStore = defineStore("getUserWithId", () => {
  const user = ref<People | undefined>();
  const userInfoStore = UserInfoStore();

  const fetchUserWithId = async () => {
    try {
      await userInfoStore.fetchUserInfo();
      const userId = userInfoStore.$state.userId;

      const response = await $fetch<People>("/api/getUserWithId", {
        method: "POST",
        body: {
          id: userId,
        },
      });

      if (response) {
        user.value = response;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return {
    user,
    fetchUserWithId,
  };
});
