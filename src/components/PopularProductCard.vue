<template>
  <div class="popular-card">
    <div
      class="popular-card__img"
      @click="$router.push(`/tabs/shop/${product.id}`)"
    >
      <img
        :src="
          product.image_url || 'https://ziyoforum-app.uz/storage/1/360x260.png'
        "
      />
    </div>
    <div
      class="popular-card__title"
      @click="$router.push(`/tabs/event/${product.id}`)"
    >
      {{ product.name }}
    </div>
    <div class="popular-card__desc">
      {{ productCategories }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useUserCompositions } from "@/compositions/useUserCompositions";
import { category, product } from "@/interfaces/shop.interface";

export default defineComponent({
  name: "PopularCard",
  props: {
    product: {
      type: Object as PropType<product>,
      required: true,
    },
  },
  setup(props) {
    const userComposition = useUserCompositions();

    const productCategories = computed(() => {
      return props.product.categories
        ?.map((cat: category) => cat.name)
        ?.join(",");
    });

    return {
      dateFormat: userComposition.formatFn,
      productCategories,
    };
  },
});
</script>

<style scoped lang="scss">
.popular-card {
  width: 200px;
  max-width: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin-right: 8px;
  flex: 1 0 200px;
  overflow: hidden;
  color: #fff;

  &__title {
    width: 100%;
    font-family: MuseoSansCyrl-500, serif;
    color: #000;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 8px;
    padding-left: 5px;
  }

  &__desc {
    width: 100%;
    font-family: MuseoSansCyrl-300, serif;
    color: #000;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 8px;
    padding-left: 5px;
    text-align: left;
  }

  &__img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    object-fit: cover;

    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
</style>
