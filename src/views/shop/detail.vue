<template>
  <ion-page class="product-detail">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      :show-bonus="true"
    />
    <div class="product-detail__content">
      <ion-content :fullscreen="true">
        <div v-if="loadingStatus" class="product-detail__img">
          <ion-thumbnail style="width: 100%; height: 260px">
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
          </ion-thumbnail>
        </div>
        <swiper
          v-else
          :modules="modules"
          :pagination="true"
          :zoom="true"
          :slidesPerView="1"
          :spaceBetween="10"
        >
          <swiper-slide v-for="(img, index) in product.images" :key="index">
            <div class="product-detail__img">
              <ion-img :src="img" />
            </div>
          </swiper-slide>
        </swiper>
        <div class="product-detail__inner">
          <ion-skeleton-text
            v-if="loadingStatus"
            :animated="true"
            class="product-detail__category"
          />
          <div v-else class="product-detail__categories">
            <div
              class="product-detail__category"
              v-for="(cat, index) in product.categories"
              :key="index"
            >
              {{ cat.name }}
            </div>
          </div>
          <ion-skeleton-text
            v-if="loadingStatus"
            :animated="true"
            class="product-detail__title"
          />
          <div v-else class="product-detail__title">
            {{ product.name }}
          </div>
          <div v-if="loadingStatus">
            <ion-skeleton-text :animated="true" class="product-detail__desc" />
            <ion-skeleton-text :animated="true" class="product-detail__desc" />
            <ion-skeleton-text :animated="true" class="product-detail__desc" />
            <ion-skeleton-text :animated="true" class="product-detail__desc" />
          </div>
          <template v-else>
            <div class="product-detail__price-wrap">
              <div v-if="product.price_old" class="product-detail__price-old">
                {{ product.price_old }} YC
              </div>
              <div class="product-detail__price">{{ product.price }} YC</div>
            </div>
            <div class="product-detail__desc-title">Описание:</div>
            <div
              class="product-detail__desc"
              v-html="product.description"
            ></div>
          </template>
          <ion-button
            v-if="product.quantity > 0"
            color="success-2"
            class="ion-margin-top page-detail__btn"
            expand="block"
            :disabled="buyLoading"
            @click="buyHandler"
          >
            <ion-spinner v-if="buyLoading" name="crescent"></ion-spinner>
            <span v-else> Заказать </span>
          </ion-button>
          <ion-text
            v-else
            style="display: block"
            color="dark"
            class="ion-text-center ion-margin-top"
          >
            нет в наличии
          </ion-text>
        </div>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Zoom } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/vue/css/ionic-swiper.css";

import {
  IonPage,
  IonContent,
  loadingController,
  IonImg,
  IonSkeletonText,
  IonThumbnail,
  IonText,
  IonButton,
  toastController,
  IonSpinner,
} from "@ionic/vue";

export default defineComponent({
  name: "ProductDetail",
  components: {
    IonContent,
    IonPage,
    Swiper,
    SwiperSlide,
    IonImg,
    IonSkeletonText,
    IonThumbnail,
    IonButton,
    IonSpinner,
    IonText,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const loadingStatus = ref(false);
    const buyLoading = ref(false);

    const product = computed(() => {
      return store.getters["shop/getOneProduct"];
    });

    const bonus = computed(() => {
      return store.getters["userModule/getBonus"];
    });

    const getOneProduct = async () => {
      loadingStatus.value = true;
      const loading = await loadingController.create({});
      await loading.present();

      await store
        .dispatch("shop/fetchOneProduct", route.params.product_id)
        .finally(() => {
          loading.dismiss();
          loadingStatus.value = false;
        });
    };

    const buyHandler = async () => {
      if (bonus.value < product.value.price) {
        const toast = await toastController.create({
          color: "danger",
          duration: 2000,
          position: "middle",
          message: "У Вас не хватает баллов",
        });

        await toast.present();
        return;
      }
      buyLoading.value = true;
      store
        .dispatch("shop/buyProduct", product.value.id)
        .then(async () => {
          const toast = await toastController.create({
            color: "primary",
            duration: 2000,
            position: "bottom",
            message: "Ваша заявка принята",
          });

          await toast.present();
          store.dispatch("userModule/fetchBonus");
          store.dispatch("shop/fetchOneProduct", route.params.product_id);
        })
        .catch(async (err) => {
          const toast = await toastController.create({
            color: "danger",
            duration: 2000,
            position: "middle",
            message: err || store.getters["shop/error"],
          });

          await toast.present();
        })
        .finally(() => {
          buyLoading.value = false;
        });
    };

    onMounted(() => {
      getOneProduct();
    });

    return {
      product,
      loadingStatus,
      buyLoading,
      buyHandler,
      modules: [Pagination, Zoom],
    };
  },
});
</script>

<style scoped lang="scss">
.product-detail {
  height: 100%;
  padding-left: 0;
  padding-right: 0;
  &__content {
    height: 100%;
  }
  &__inner {
    padding-left: 15px;
    padding-right: 15px;
  }
  &__img {
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    max-width: 400px;
    margin-bottom: 28px;
  }
  &__title {
    font-family: MuseoSansCyrl-700, serif;
    font-size: 20px;
    line-height: 24px;
    color: #001a35;
    margin-bottom: 10px;
  }
  &__desc-title {
    font-family: MuseoSansCyrl-500, serif;
    font-size: 13px;
    line-height: 16px;
    color: rgba(0, 26, 53, 0.5);
    margin-bottom: 10px;
  }
  &__desc {
    font-size: 10px;
    line-height: 12px;
    color: #001a35;
  }
  .swiper {
    --bullet-background-active: #0a1938;
    --bullet-background: rgba(0, 26, 53, 0.5);
    --bullet-width-active: 12px;
  }
  &__btn {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    --border-radius: 10px;
  }
  &__categories {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  &__category {
    background: #ecffd8;
    border-radius: 7px;
    font-size: 8px;
    padding: 2px 8px;
    line-height: 10px;
    text-align: center;
    color: #001a35;
    margin-right: 5px;
  }
  &__price-wrap {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 19px;
    color: #61c000;
    font-family: MuseoSansCyrl-500, serif;
    margin-bottom: 10px;
  }
  &__price-old {
    margin-right: 10px;
    text-decoration-line: line-through;
  }
}
</style>
