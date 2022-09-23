<template>
  <ion-card class="news-big">
    <img :src="item.image_url" :alt="item.title" />
    <ion-card-content>
      <ion-card-title class="news-big__title">
        {{ item.title }}
      </ion-card-title>
      <ion-card-subtitle class="news-big__date">
        {{ moment(item.published_at).format("DD.MM.YYYY") }}
      </ion-card-subtitle>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import * as moment from "moment";

import { news as oneNews } from "@/interfaces/news.interface";

import {
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
} from "@ionic/vue";

export default defineComponent({
  name: "NewsCardBig",
  props: {
    item: {
      type: Object as PropType<oneNews>,
      required: true,
    },
  },
  components: {
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    // IonCardHeader,
  },
  setup() {
    return {
      moment,
    };
  },
});
</script>

<style scoped lang="scss">
.news-big {
  box-shadow: none;
  max-width: 100%;
  width: 330px;
  margin: 5px;
  img {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: none;
    width: 100%;
    object-fit: cover;
  }
  &__title {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    margin-top: 8px;
    margin-bottom: 3px;
  }
  &__date {
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    color: #61c000;
  }
  ion-card-content {
    padding: 0;
  }
}
</style>
