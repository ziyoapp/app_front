<template>
  <div class="transactions">
    <div
      v-for="(transaction, index) in transactions"
      :key="index"
      class="transactions__item"
      :class="{ _bonus: transaction.operation_type === 'add' }"
    >
      <div class="transactions__item-name">
        {{ transaction.name || "-" }}
      </div>
      <div class="transactions__item-footer">
        <div class="transactions__item-price">
          {{ transaction.ball }} {{ transaction.currency }}
        </div>
        <div class="transactions__item-date">
          {{ transaction.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { bonusHistory } from "@/interfaces/user.interface";

export default defineComponent({
  name: "TransactionsList",
  props: {
    transactions: {
      type: Array as PropType<Array<bonusHistory>>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.transactions {
  &__item {
    padding: 15px;
    background: rgba(238, 71, 101, 0.1);
    border-radius: 10px;
    min-height: 72px;
    margin-bottom: 10px;

    &._bonus {
      background: rgba(70, 187, 12, 0.1);
    }
  }
  &__item-name {
    font-family: MuseoSansCyrl-500, serif;
    font-size: 13px;
    line-height: 16px;
    color: #0a1938;
    margin-bottom: 10px;
  }
  &__item-footer {
    display: flex;
    justify-content: space-between;
  }
  &__item-price {
    font-family: MuseoSansCyrl-500, serif;
    font-size: 14px;
    line-height: 17px;
    color: #46bb0c;
  }
  &__item-date {
    font-size: 10px;
    line-height: 12px;
    text-align: right;
    color: #0a1938;
  }
}
</style>
