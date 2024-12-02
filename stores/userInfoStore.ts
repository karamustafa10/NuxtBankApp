import { defineStore } from "pinia";
import { ref } from "vue";

export const UserInfoStore = defineStore("userInfo", () => {
  const userId = ref<number | undefined>();

  const fetchUserInfo = async () => {
    try {
      const response = (await $fetch("/api/userInfo")) as any;
      if (response?.success && response?.userId) {
        userId.value = response.userId;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return { userId, fetchUserInfo };
});
