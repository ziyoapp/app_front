<template>
  <ion-page class="events-history">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :has-share="true"
      :has-notify="false"
      :has-search="false"
      :has-title="true"
      title="История событий"
    />
    <div class="events-history__content">
      <ion-content :fullscreen="true">
        <div v-if="!list.length" class="ion-text-center">
          <h1>Нет событий</h1>
        </div>
        <div
          v-for="(event, index) in list"
          :key="index"
          class="events-history__item"
        >
          <div class="events-history__item-text">
            {{ event.title }}
          </div>
          <div class="events-history__footer">
            <span>отменить заявку</span>
            <span>
              {{ moment(event.date_start).format("DD.MM.YYYY") }}
            </span>
          </div>
        </div>
      </ion-content>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import * as moment from "moment";

import { IonPage, IonContent, loadingController } from "@ionic/vue";

export default defineComponent({
  name: "history",
  components: {
    IonPage,
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
      loadingStatus: false,
    });

    const list = computed(() => {
      return store.getters["events/getAll"];
    });

    const pagination = computed(() => {
      return store.getters["events/getPagination"];
    });

    const infiniteScrollHandler = async (ev: CustomEvent) => {
      const pageNumber = pagination.value.current_page + 1;
      if (pageNumber <= pagination.value.last_page) {
        localState.filterData.page = pagination.value.current_page + 1;
        localState.filterData.per_page = pagination.value.per_page;
        await getEvents(true).then(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ev.target.complete();
        });
      } else {
        localState.isDisabledLoadMore = true;
      }
    };

    const getEvents = async (isInfiniteScroll: boolean, showLoader = true) => {
      let loading: any;
      if (!isInfiniteScroll && showLoader) {
        loading = await loadingController.create({
          message: "Загрузка...",
        });
        await loading.present();
      }
      await store
        .dispatch("events/fetchAll", {
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
      getEvents(false);
    });

    return {
      ...toRefs(localState),
      infiniteScrollHandler,
      pagination,
      list,
      moment,
    };
  },
});
</script>

<style scoped lang="scss">
.events-history {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__item {
    background: rgba(10, 25, 56, 0.05);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px 15px 9px;
  }
  &__item-text {
    font-weight: 600;
    font-size: 13px;
    line-height: 22px;
    color: #0a1938;
    margin-bottom: 10px;
  }
  &__footer {
    font-weight: 600;
    font-size: 10px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #61c000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
