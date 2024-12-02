import { defineStore } from "pinia";
import { ref } from "vue";
import { UserInfoStore } from "./userInfoStore";
import type { Card } from "~/models/card";

export const GetCardWithIdStore = defineStore("getCardWithId", () => {
  const cards = ref<Card[]>([]);
  const userInfoStore = UserInfoStore();

  const fetchCardWithId = async () => {
    try {
      await userInfoStore.fetchUserInfo();
      const userId = userInfoStore.$state.userId;

      const response = await $fetch<Card[]>("/api/getCardWithId", {
        method: "POST",
        body: {
          id: userId,
        },
      });

      if (response) {
        cards.value = response;
      }
    } catch (error) {
      console.error("Error fetching card:", error);
    }
  };

  return {
    cards,
    fetchCardWithId,
  };
});
