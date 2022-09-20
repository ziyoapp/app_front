<template>
  <ion-page
    data-pageid="routeroutlet"
    class="auth-page"
    :class="{ _bg: hasBackground }"
  >
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonRouterOutlet, IonPage, IonContent } from "@ionic/vue";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "AuthPage",
  components: {
    IonRouterOutlet,
    IonPage,
    IonContent,
  },
  setup() {
    const route = useRoute();

    const hasBackground = computed(() => {
      return route.fullPath === "/auth";
    });

    return {
      hasBackground,
    };
  },
});
</script>

<style lang="scss">
.auth-page {
  &._bg {
    &:before {
      z-index: 5;
      position: absolute;
      display: block;
      content: "";
      width: 180px;
      max-width: 100%;
      max-height: 100%;
      height: 313px;
      background: url("/src/assets/svg/welcome_bg.svg") 0 0 no-repeat;
      top: auto;
      bottom: 0;
      right: 0;
      left: auto;
    }
  }
}
</style>
