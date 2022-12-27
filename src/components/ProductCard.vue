<template>
  <div class="product-card">
    <div class="product-card__img">
      <img
        :src="
          product.image_url || 'https://ziyoforum-app.uz/storage/1/360x260.png'
        "
        :alt="product.name"
      />
    </div>
    <div class="product-card__name">
      {{ product.name }}
    </div>
    <div class="product-card__footer">
      <div class="product-card__price">
        <bonus-icon :width="10" :height="10" />
        <span> {{ product.price }} </span>
      </div>
      <span class="product-card__category">
        {{ product.categories[0] ? product.categories[0].name : "-" }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { product as oneProduct } from "@/interfaces/shop.interface";

import BonusIcon from "@/assets/svg/bonus.vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object as PropType<oneProduct>,
      required: true,
    },
  },
  components: { BonusIcon },
});
</script>

<style scoped lang="scss">
.product-card {
  &__img {
    border-radius: 10px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    overflow: hidden;

    img {
      width: 160px;
      height: 90px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  &__name {
    font-family: MuseoSansCyrl-500, serif;
    font-size: 9px;
    line-height: 11px;
    color: rgba(0, 26, 53, 0.5);
    margin-bottom: 5px;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__price {
    font-family: MuseoSansCyrl-500, serif;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    color: #001a35;

    span {
      margin-left: 2px;
    }
  }
  &__category {
    background: #ecffd8;
    border-radius: 7px;
    font-size: 8px;
    padding: 2px 8px;
    line-height: 10px;
    text-align: center;
    color: #001a35;
  }
}
</style>
