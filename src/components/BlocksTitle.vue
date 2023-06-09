<template>
  <div class="blocks-title">
    <div class="blocks-title__text">
      {{ text }}
    </div>
    <div class="blocks-title__link">
      <ion-button
        v-if="type === BLOCK_TYPES_RECORD.events"
        fill="clear"
        router-link="/tabs/events"
      >
        {{ linkText }}
      </ion-button>
      <ion-button
        v-else-if="type === BLOCK_TYPES_RECORD.news"
        fill="clear"
        router-link="/tabs/news"
      >
        {{ linkText }}
      </ion-button>
      <ion-button
        v-else-if="type === BLOCK_TYPES_RECORD.goods"
        fill="clear"
        router-link="/tabs/shop"
      >
        {{ linkText }}
      </ion-button>
      <ion-button
        v-else-if="DEVELOPMENT_PAGES.includes(type)"
        fill="clear"
        router-link="/tabs/development"
      >
        {{ linkText }}
      </ion-button>
      <ion-nav-link v-else router-direction="forward" :component="component">
        {{ linkText }}
      </ion-nav-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { BLOCK_TYPES, BLOCK_TYPES_RECORD } from "@/shared/constants";

import { IonNavLink, IonButton } from "@ionic/vue";
import NewsPage from "@/views/news/index.vue";
import NotFoundPage from "@/views/404.vue";

export default defineComponent({
  name: "BlocksTitle",
  props: {
    text: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      default: "смотреть все",
    },
    type: {
      type: String,
      required: true,
    },
  },
  components: { IonNavLink, IonButton },
  setup(props) {
    const DEVELOPMENT_PAGES = [BLOCK_TYPES_RECORD.tasks];

    const component = computed(() => {
      if (!BLOCK_TYPES.includes(props.type)) {
        return NotFoundPage;
      }
      if (props.type === BLOCK_TYPES_RECORD.news) return NewsPage;

      return null;
    });

    return {
      BLOCK_TYPES,
      BLOCK_TYPES_RECORD,
      DEVELOPMENT_PAGES,
      component,
    };
  },
});
</script>

<style scoped lang="scss">
.blocks-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__text {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 19px;
    color: #000000;
    font-family: MuseoSansCyrl-500, serif;
  }
  &__link,
  &__link button,
  &__link ion-button {
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    text-align: right;
    color: #46bb0c;
    text-transform: none;
  }
}
</style>
