<template>
  <ion-page class="notify-page">
    <app-header
      :has-logo="false"
      :has-menu="false"
      :show-bonus="false"
      :has-search="false"
      :has-notify="false"
    />
    <ion-toolbar :class="{ _ios: isPlatform('ios') }">
      <ion-segment v-model="selectedSegment">
        <ion-segment-button value="notifications">
          Уведомления
        </ion-segment-button>
        <ion-segment-button value="transactions"> Операции </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
    <div class="notify-page__content">
      <ion-content :fullscreen="true">
        <transactions-list
          v-if="selectedSegment === 'transactions'"
          :transactions="transactions"
        />
        <notifications-list v-else :notifications="notifications" />
        <ion-infinite-scroll
          @ionInfinite="infiniteScrollHandler($event)"
          threshold="100px"
          id="infinite-scroll"
          :disabled="isDisabledLoadMoreNotify"
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
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  loadingController,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  isPlatform,
} from "@ionic/vue";
import { useStore } from "vuex";

import TransactionsList from "@/components/notifications/TransactionsList.vue";
import { useRoute } from "vue-router";
import NotificationsList from "@/components/notifications/NotificationsList.vue";

export default defineComponent({
  name: "NotificationsPage",
  components: {
    NotificationsList,
    IonPage,
    IonContent,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    TransactionsList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const localState = reactive({
      filterDataTransactions: {
        page: 1,
        per_page: 10,
      },
      filterDataNotifications: {
        page: 1,
        per_page: 10,
      },
      isDisabledLoadMoreNotify: false,
      selectedSegment: "transactions",
    });

    const paginationTransactions = computed(() => {
      return store.getters["userModule/getTransactionsPagination"];
    });

    const paginationNotifications = computed(() => {
      return store.getters["userModule/getNotifyPagination"];
    });

    const transactions = computed(() => {
      return store.getters["userModule/getTransactions"];
    });

    const notifications = computed(() => {
      return store.getters["userModule/getNotifications"];
    });

    const infiniteScrollHandler = async (ev: CustomEvent) => {
      // TODO сделать объект пагинации динамическим добавив уведомления

      const pagination =
        localState.selectedSegment === "transactions"
          ? paginationTransactions
          : paginationNotifications;

      const pageNumber = pagination.value.current_page + 1;
      if (pageNumber <= pagination.value.last_page) {
        if (localState.selectedSegment === "transactions") {
          localState.filterDataTransactions.page =
            pagination.value.current_page + 1;
          localState.filterDataTransactions.per_page =
            pagination.value.per_page;
        } else {
          localState.filterDataNotifications.page =
            pagination.value.current_page + 1;
          localState.filterDataNotifications.per_page =
            pagination.value.per_page;
        }

        await getTransactions({ isInfiniteScroll: true }).then(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ev.target.complete();
        });
      } else {
        localState.isDisabledLoadMoreNotify = true;
      }
    };

    const getTransactions = async ({
      isInfiniteScroll = false,
      showLoader = true,
    }) => {
      let loading: any;
      if (!isInfiniteScroll && showLoader) {
        loading = await loadingController.create({});
        await loading.present();
      }
      await store
        .dispatch("userModule/fetchTransactions", {
          ...localState.filterDataTransactions,
          isInfiniteScroll,
        })
        .then(() => {
          localState.isDisabledLoadMoreNotify = false;
        })
        .finally(() => {
          if (loading && loading.dismiss) loading.dismiss();
        });
    };

    const getNotifications = async ({
      isInfiniteScroll = false,
      showLoader = true,
    }) => {
      let loading: any;
      if (!isInfiniteScroll && showLoader) {
        loading = await loadingController.create({});
        await loading.present();
      }
      await store
        .dispatch("userModule/getNotifications", {
          ...localState.filterDataTransactions,
          isInfiniteScroll,
        })
        .then(() => {
          localState.isDisabledLoadMoreNotify = false;
        })
        .finally(() => {
          if (loading && loading.dismiss) loading.dismiss();
        });
    };

    const setDefaultSegment = () => {
      setTimeout(() => {
        if (route.params?.notify) {
          localState.selectedSegment = "notifications";
        } else {
          localState.selectedSegment = "transactions";
        }
      });
    };

    onMounted(() => {
      setDefaultSegment();
      getTransactions({ isInfiniteScroll: false, showLoader: true });
      getNotifications({ isInfiniteScroll: false, showLoader: true });
    });

    return {
      ...toRefs(localState),
      transactions,
      notifications,
      infiniteScrollHandler,
      isPlatform,
    };
  },
});
</script>

<style scoped lang="scss">
.notify-page {
  height: 100%;
  padding-left: 0;
  padding-right: 0;
  &__content {
    height: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }

  ion-toolbar {
    top: -30px;
    height: 30px;

    &._ios {
      height: 40px;
    }
  }

  ion-segment {
  }

  ion-segment-button {
    --color-checked: #001a35;
    --border-color-checked: #001a35;
    --border-color: rgba(#001a35, 0.1);
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    color: #001a35;
    font-family: MuseoSansCyrl-500, serif;
    text-transform: none;
    height: 20px;
    min-height: 0;
  }
}
</style>
