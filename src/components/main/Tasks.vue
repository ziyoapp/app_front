<template>
  <div class="tasks-short">
    <div v-if="loading" class="news-short__title">
      <ion-skeleton-text animated />
    </div>
    <blocks-title
      v-else
      class="tasks-short__title"
      :type="BLOCK_TYPES_RECORD.tasks"
      text="Задания"
      link-text="Все задания"
    />
    <template v-if="loading">
      <div class="tasks-short__card">
        <div class="tasks-short__card-content">
          <ion-skeleton-text />
          <ion-skeleton-text />
          <ion-skeleton-text />
        </div>
        <ion-thumbnail class="news-short__card-img">
          <ion-skeleton-text />
        </ion-thumbnail>
      </div>
    </template>
    <div v-else class="tasks-short__card">
      <div class="tasks-short__card-content">
        <div class="tasks-short__card-title">Superstudent</div>
        <div class="tasks-short__card-text">
          Заполните графу “О себе” в настройках профиля и получите 200 Ziyo coin
        </div>
      </div>
      <div class="tasks-short__card-img">
        <img src="/assets/gift.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonThumbnail, IonSkeletonText } from "@ionic/vue";

import BlocksTitle from "@/components/BlocksTitle.vue";

import { BLOCK_TYPES_RECORD } from "@/shared/constants";

export default defineComponent({
  name: "Tasks",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonThumbnail,
    IonSkeletonText,
    BlocksTitle,
  },
  setup() {
    return {
      BLOCK_TYPES_RECORD,
    };
  },
});
</script>

<style scoped lang="scss">
.tasks-short {
  &__title {
    margin-bottom: 10px;
  }
  &__card {
    width: 100%;
    height: 90px;
    background: #ffd705;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__card-content {
    padding: 10px 12px 14px;
    max-width: 60%;
  }
  &__card-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #001a35;
    margin-bottom: 9px;
  }
  &__card-text {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: #001a35;
  }
  &__card-img {
    width: 68px;
    height: 68px;
    img {
      max-width: 100%;
    }
  }
}
</style>
