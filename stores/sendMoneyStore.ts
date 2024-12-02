import { defineStore } from "pinia";
import { ref } from "vue";
import type { Card } from "~/models/card";
import type { People } from "~/models/people";

export const SendMoneyStore = defineStore("sendMoney", () => {
  const message = ref<string>("Transaction failed!");
  const sendMoneyWithStore = async (
    senderId: string,
    senderCardType: Card | undefined,
    transferAmount: string,
    receiverId: People | undefined
  ) => {
    try {
      const response = await $fetch("/api/sendMoney", {
        method: "POST",
        body: {
          senderId: senderId?.toString(),
          senderCardType: senderCardType?.toString(),
          transferAmount: transferAmount?.toString(),
          receiverId: receiverId?.toString(),
        },
      });

      if (response.status === "success") {
        message.value = response.message;
        return message.value;
      } else {
        message.value = response.message;
        return message.value;
      }
    } catch (error) {
      console.error("Error sending money:", error);
    }
  };

  return {
    sendMoneyWithStore,
    message,
  };
});
