import { defineStore } from "pinia";
import { UserInfoStore } from "@/stores/userStore";
import type { Transaction } from "~/models/transaction";

export const GetTransactionStore = defineStore("transaction", () => {
  const transactions = ref<Transaction[]>([]);
  const userInfoStore = UserInfoStore();

  const fetchTransactions = async () => {
    try {
      await userInfoStore.fetchUserInfo();
      const userId = userInfoStore.$state.userId;

      const response = await $fetch("/api/getTransactions", {
        method: "POST",
        body: {
          id: userId,
        },
      });

      if (response && "list" in response) {
        transactions.value = response.list.map((transaction: any) => ({
          user: transaction.user,
          date: transaction.date.toString(),
          number: transaction.number,
          state: transaction.state,
          amount: transaction.amount,
          detail: transaction.detail,
          cardType: transaction.cardType,
        }));
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return {
    transactions,
    fetchTransactions,
  };
});

export const GetAllTransactionsStore = defineStore("getAllTransactions", () => {
  const transactions = ref<Transaction[]>([]);

  const fetchAllTransactions = async () => {
    try {
      const response = await $fetch("/api/getAllTransactions");

      if (response && "list" in response) {
        transactions.value = response.list.map((transaction: any) => ({
          user: transaction.user,
          date: transaction.date.toString(),
          number: transaction.number,
          state: transaction.state,
          amount: transaction.amount,
          detail: transaction.detail,
          cardType: transaction.cardType,
        }));
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return {
    transactions,
    fetchAllTransactions,
  };
});
