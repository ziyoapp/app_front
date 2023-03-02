<template>
  <ion-page class="shop-page">
    <app-header
      :has-logo="false"
      :has-menu="true"
      :show-bonus="true"
      :has-search="true"
      :has-notify="true"
    />
    <div class="shop-page__content">
      <ion-content :fullscreen="true">
        <div class="shop-page__slider">
          <swiper
            :modules="modules"
            :pagination="true"
            :zoom="true"
            :slidesPerView="1"
            :spaceBetween="10"
          >
            <swiper-slide
              v-for="(product, index) in productsRandom"
              :key="index"
            >
              <ion-item
                class="shop-page__item default"
                router-direction="forward"
                style="height: 100%"
                :router-link="`/tabs/shop/${product.id}`"
              >
                <div class="shop-page__slide">
                  <img :src="product.image_url" alt="" />
                  <h2>{{ product.name }}</h2>
                </div>
              </ion-item>
            </swiper-slide>
          </swiper>
        </div>
        <div class="shop-page__filters">
          <ion-button
            v-for="(category, index) in categories"
            :key="index"
            color="success-2"
            :fill="
              Number(category.id) === Number(selectedCategoryId)
                ? 'solid'
                : 'outline'
            "
            size="small"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </ion-button>
        </div>
        <ion-grid>
          <ion-row>
            <ion-col
              v-for="(product, index) in products"
              :key="index"
              class="shop-page__event-wrap"
              size="6"
              size-lg="3"
              size-xs="6"
              size-md="4"
            >
              <ion-item
                class="shop-page__item default"
                router-direction="forward"
                :router-link="`/tabs/shop/${product.id}`"
              >
                <product-card :product="product" />
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-infinite-scroll
          @ionInfinite="infiniteScrollHandler($event)"
          threshold="100px"
          id="infinite-scroll"
          :disabled="isDisabledLoadMore"
        >
          <ion-infinite-scroll-content
            loading-spinner="bubbles"
            loading-text="Загрузка..."
          >
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import {
  IonPage,
  IonContent,
  loadingController,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
} from "@ionic/vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/vue/css/ionic-swiper.css";

import { useStore } from "vuex";

import productCard from "@/components/ProductCard.vue";

export default defineComponent({
  name: "ShopPage",
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    productCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();

    const localState = reactive({
      filterData: {
        page: 1,
        per_page: 6,
      },
      isDisabledLoadMore: false,
      selectedCategoryId: "all",
    });

    const products = computed(() => {
      return store.getters["shop/getProducts"];
    });

    const productsRandom = computed(() => {
      return store.getters["shop/getRandomProducts"];
    });

    const categories = computed(() => {
      return store.getters["shop/getCategories"];
    });

    const pagination = computed(() => {
      return store.getters["shop/getPagination"];
    });

    const infiniteScrollHandler = async (ev: CustomEvent) => {
      const pageNumber = pagination.value.current_page + 1;
      if (pageNumber <= pagination.value.last_page) {
        localState.filterData.page = pagination.value.current_page + 1;
        localState.filterData.per_page = pagination.value.per_page;
        await getProducts(true).then(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ev.target.complete();
        });
      } else {
        localState.isDisabledLoadMore = true;
      }
    };

    const getProducts = async (
      isInfiniteScroll: boolean,
      showLoader = true
    ) => {
      let loading: any;
      if (!isInfiniteScroll && showLoader) {
        loading = await loadingController.create({});
        await loading.present();
      }
      await store
        .dispatch("shop/fetchProducts", {
          ...localState.filterData,
          isInfiniteScroll,
          category_id: localState.selectedCategoryId,
        })
        .then(() => {
          localState.isDisabledLoadMore = false;
        })
        .finally(() => {
          if (loading && loading.dismiss) loading.dismiss();
        });
    };

    const getProductsRandom = async () => {
      await store.dispatch("shop/fetchProductsRandom");
    };

    const selectCategory = (id: number | string) => {
      // @ts-ignore
      localState.selectedCategoryId = id;
    };

    watch(
      () => localState.selectedCategoryId,
      () => {
        localState.filterData.page = 1;
        getProducts(false, true);
      }
    );

    onMounted(() => {
      store.dispatch("shop/fetchCategories");
      getProducts(false);
      getProductsRandom();
    });

    return {
      ...toRefs(localState),
      infiniteScrollHandler,
      selectCategory,
      pagination,
      products,
      categories,
      productsRandom,
      modules: [Pagination, Zoom],
    };
  },
});
</script>

<style lang="scss">
.shop-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__slider {
    margin-bottom: 26px;
  }
  &__filters {
    display: flex;
    align-items: center;
    overflow: auto;

    ion-button {
      --border-radius: 10px;
      margin-right: 7px;
      height: 32px;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      --color: rgba(0, 26, 53, 1);
      --border-width: 1px;

      .button-native {
        --color: rgba(0, 26, 53, 1);
        color: rgba(0, 26, 53, 1) !important;
      }
    }
  }
  &__event-wrap {
    display: flex;
    justify-content: center;
  }
  &__item {
    --border-width: 0;
    --border-radius: 0;
    --border-color: transparent;
  }

  &__slide {
    margin: auto;
    img {
      height: 180px;
      margin-bottom: 15px;
      border-radius: 10px;
    }

    h2 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      line-height: 19px;
      font-weight: 600;
      text-align: center;
    }
  }

  .swiper .swiper-slide img {
    height: 180px;
    margin-bottom: 15px;
    border-radius: 10px;
  }

  .swiper-slide {
    display: block;
    width: 100%;
    height: 255px;
  }

  .swiper {
    --bullet-background-active: #0a1938;
    --bullet-background: rgba(0, 26, 53, 0.5);
    --bullet-width-active: 12px;
  }
}
</style>
