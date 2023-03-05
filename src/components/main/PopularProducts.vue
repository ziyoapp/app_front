<template>
  <div class="popular-products">
    <div v-if="loading" class="popular-products__title">
      <ion-skeleton-text animated />
    </div>
    <blocks-title
      v-else
      class="events-short__title"
      :type="BLOCK_TYPES_RECORD.goods"
      text="Популярные товары"
    />
    <div class="popular-products__list">
      <template v-if="loading">
        <ion-thumbnail class="events-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
        <ion-thumbnail class="events-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
        <ion-thumbnail class="events-short__item">
          <ion-skeleton-text />
        </ion-thumbnail>
      </template>
      <popular-card
        v-else
        v-for="(item, index) in list"
        :key="index"
        :product="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonThumbnail, IonSkeletonText } from "@ionic/vue";
import BlocksTitle from "@/components/BlocksTitle.vue";
import PopularCard from "@/components/PopularProductCard.vue";

import { BLOCK_TYPES_RECORD } from "@/shared/constants";
import { product } from "@/interfaces/shop.interface";
import { defineProps } from "vue";

defineProps<{
  loading: boolean;
  list: Array<product>;
}>();
</script>

<style scoped lang="scss">
.popular-products {
  &__title {
    margin-bottom: 10px;
    padding-right: 10px;
  }
  &__list {
    display: flex;
    align-items: center;
    overflow-x: auto;
  }
  &__item {
    width: 200px;
    margin-right: 10px;
  }
}
</style>
