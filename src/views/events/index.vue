<template>
  <ion-page class="events-page">
    <app-header :has-logo="true" :has-menu="true" />
    <div class="events-page__content">
      <ion-content :fullscreen="true">
        <ion-grid>
          <ion-row>
            <ion-col class="events-page__top-card _first" size="6">
              <div>
                <student-events />
              </div>
            </ion-col>
            <ion-col class="events-page__top-card _second" size="6">
              <div>
                <free-events />
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="events-page__top-card _third" size="12">
              <div>
                <talk-events />
              </div>
            </ion-col>
          </ion-row>

          <div class="events-page__filters">
            <ion-button color="success-2" fill="solid" size="small">
              Все события(8)
            </ion-button>
            <ion-button color="success-2" fill="outline" size="small">
              Новые(5)
            </ion-button>
            <ion-button color="success-2" fill="outline" size="small">
              Бесплатные(5)
            </ion-button>
            <ion-button color="success-2" fill="outline" size="small">
              Прошедшие
            </ion-button>
          </div>
          <div class="events-page__list">
            <ion-row>
              <ion-col
                v-for="(event, index) in list"
                :key="index"
                class="events-page__event-wrap"
                size="6"
                size-lg="3"
                size-xs="6"
                size-md="4"
              >
                <ion-item
                  router-direction="forward"
                  class="events-page__item"
                  :router-link="`/tabs/event/${event.id}`"
                >
                  <event-card-big :event="event" />
                </ion-item>
              </ion-col>
            </ion-row>
          </div>
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
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";

import EventCardBig from "@/components/EventCardBig.vue";
import StudentEvents from "@/assets/svg/StudensEvent.vue";
import FreeEvents from "@/assets/svg/FreeEvent.vue";
import TalkEvents from "@/assets/svg/TalkEvent.vue";

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
import { useStore } from "vuex";

export default defineComponent({
  name: "index",
  components: {
    IonPage,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    StudentEvents,
    FreeEvents,
    TalkEvents,
    EventCardBig,
    IonItem,
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
    };
  },
});
</script>

<style lang="scss">
.events-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__top-card {
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      padding: 8px;
      min-height: 200px;
    }

    &._first {
      div {
        align-items: flex-end;
        background: rgba(70, 187, 12, 0.5);
        padding-bottom: 0;
      }
    }

    &._second {
      div {
        background: rgba(238, 71, 101, 1);
      }
    }

    &._third {
      div {
        background: radial-gradient(
          75% 75% at 50% 50%,
          #ffd12f 0%,
          #ffb743 100%
        );
      }
    }
  }
  &__event-wrap {
    display: flex;
    justify-content: center;
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
      font-size: 10px;
      line-height: 12px;
      --color: rgba(0, 26, 53, 1);
      --border-width: 1px;

      .button-native {
        --color: rgba(0, 26, 53, 1);
        color: rgba(0, 26, 53, 1) !important;
      }
    }
  }
  &__item {
    --border-width: 0;
    --border-radius: 0;
    --border-color: transparent;
  }
}
</style>