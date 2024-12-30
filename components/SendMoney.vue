<template>
  <div class="text-lg mb-[6%] font-semibold">{{ $t("send_money") }}</div>
  <div class="w-[100%]">
    <USelectMenu
      color="blue"
      v-model="cardSelectedNormal"
      value-attribute="type"
      option-attribute="cardName"
      class="w-[100%]"
      :placeholder="$t('select_a_card')"
      :options="
        getCardWithIdStore.cards.map((card) => ({
          ...card,
          cardName: `${card.cardName} ( ${Number(card.cardAmount).toFixed(
            2
          )}$ )`,
        }))
      "
    />
  </div>
  <div class="w-[100%] mt-[4%]">
    <UInput
      color="blue"
      type="number"
      class="w-[100%]"
      v-model="enterAmountNormal"
      :placeholder="$t('enter_amount')"
    />
  </div>
  <div class="w-[100%] mt-[4%]">
    <div class="w-[100%] mt-[4%]">
      <USelectMenu
        color="blue"
        class="w-[100%]"
        v-model="personSelected"
        :placeholder="$t('select_a_person')"
        value-attribute="id"
        option-attribute="name"
        :options="
          getAllUsersStore.users.map((person: People) => ({
            id: person.id,
            name: `${person.firstName} ${person.lastName}`,
          }))
        "
      />
    </div>
  </div>
  <div class="w-[100%] mt-[6%]">
    <UButton
      @click="sendMoney"
      class="w-[100%] h-[6.5vh] flex justify-center items-center sendButton"
      >{{ $t("send") }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import "@/stores/userStore";
import "@/stores/cardStore";
import "@/stores/transactionStore";
import type { Card } from "@/models/card";
import type { People } from "@/models/people";
import { useToast, POSITION } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const toast = useToast();

const enterAmountNormal = ref();
const cardSelectedNormal = ref<Card>();
const personSelected = ref<People>();
const senderUserId = ref();

const userInfoStore = UserInfoStore();
const getCardWithIdStore = GetCardWithIdStore();
const getAllUsersStore = GetAllUsersStore();
const getTransactionStore = GetTransactionStore();
const sendMoneyStore = SendMoneyStore();

onMounted(async () => {
  await userInfoStore.fetchUserInfo();
  await getCardWithIdStore.fetchCardWithId();
  await getAllUsersStore.fetchAllUsers();
  await getTransactionStore.fetchTransactions();
  senderUserId.value = userInfoStore.userId;
});

const sendMoney = async () => {
  const data = {
    senderId: senderUserId.value,
    senderCardType: cardSelectedNormal.value,
    transferAmount: enterAmountNormal.value.toString(),
    receiverId: personSelected.value,
  };
  const response = await sendMoneyStore.sendMoneyWithStore(
    data.senderId,
    data.senderCardType,
    data.transferAmount,
    data.receiverId
  );

  if (response === "Money sent successfully!") {
    toast.success(t("money_sent_successfully"), {
      position: POSITION.TOP_CENTER,
    });
    await userInfoStore.fetchUserInfo();
    await getCardWithIdStore.fetchCardWithId();
    await getAllUsersStore.fetchAllUsers();
    await getTransactionStore.fetchTransactions();
    enterAmountNormal.value = null;
    cardSelectedNormal.value = undefined;
    personSelected.value = undefined;
  } else {
    toast.error(`${response}`, {
      position: POSITION.TOP_CENTER,
    });
  }

  await userInfoStore.fetchUserInfo();
  await getCardWithIdStore.fetchCardWithId();
  await getAllUsersStore.fetchAllUsers();
  await getTransactionStore.fetchTransactions();
  enterAmountNormal.value = null;
  cardSelectedNormal.value = undefined;
  personSelected.value = undefined;
};

useHead({
  title: "Ridex | Future Bank App",
});

definePageMeta({
  colorMode: "_light" as "light" | "dark",
  middleware: "auth-required",
});
</script>

<style scoped>
.sendButton {
  background-color: white;
  color: #0177fb;
  border: 1px solid #0177fb;
  transition: 0.3s;
}

.sendButton:hover {
  background-color: #0177fb;
  color: white;
}

.editButton {
  background-color: none;
  background: none;
  color: rgba(128, 128, 128, 0.5);
  transition: 0.3s;
}

.editButton:hover {
  background-color: gray;
  color: white;
  transition: 0.3s;
}

.searchButton {
  background-color: none;
  background: none;
  color: #0177fb;
  transition: 0.3s;
}

.searchButton:hover {
  background-color: #0177fb;
  color: white;
  transition: 0.3s;
}
</style>
