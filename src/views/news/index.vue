<template>
  <!--  <div class="news-page">-->
  <app-header :has-logo="false" :has-menu="false" has-title title="Новости" />
  <div class="news-page__content">
    <ion-content :fullscreen="true">
      <div class="news-page__list">
        <news-card-big
          v-for="(item, index) in list"
          :key="index"
          :item="item"
        />
      </div>
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
  <!--  </div>-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";

import {
  IonContent,
  loadingController,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";

import AppHeader from "@/components/HeaderComponent.vue";
import NewsCardBig from "@/components/NewsCardBig.vue";

export default defineComponent({
  name: "NewsPage",
  components: {
    NewsCardBig,
    AppHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonContent,
  },
  setup() {
    const store = useStore();

    const localState = reactive({
      filterData: {
        page: 1,
        per_page: 5,
      },
      isDisabledLoadMore: false,
    });

    const list = computed(() => {
      return store.getters["news/getAll"];
    });

    const pagination = computed(() => {
      return store.getters["news/getPagination"];
    });

    const infiniteScrollHandler = async (ev: CustomEvent) => {
      const pageNumber = pagination.value.current_page + 1;
      if (pageNumber <= pagination.value.last_page) {
        localState.filterData.page = pagination.value.current_page + 1;
        localState.filterData.per_page = pagination.value.per_page;
        await getNews(true).then(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ev.target.complete();
        });
      } else {
        localState.isDisabledLoadMore = true;
      }
    };

    const getNews = async (isInfiniteScroll: boolean, showLoader = true) => {
      let loading: any;
      if (!isInfiniteScroll && showLoader) {
        loading = await loadingController.create({
          message: "Загрузка...",
        });
        await loading.present();
      }
      await store
        .dispatch("news/fetchAll", {
          data: localState.filterData,
          isInfiniteScroll,
        })
        .then(() => {
          localState.isDisabledLoadMore = false;
        })
        .finally(() => {
          if (loading && loading.dismiss) loading.dismiss();
        });
    };

    onMounted(() => {
      getNews(false);
    });

    return {
      ...toRefs(localState),
      infiniteScrollHandler,
      pagination,
      list,
    };
  },
});
</script>

<style scoped lang="scss">
.news-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
