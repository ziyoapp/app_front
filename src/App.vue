<template>
  <ion-app
    style="z-index: 100"
    :class="{ scan: route.name === 'Scanner' }"
    class="ion-page"
  >
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { computed, defineComponent, onMounted } from "vue";
import { TokenService } from "@/services/token.service";
import { useStore } from "vuex";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const loggedIn = computed(() => {
      return !!TokenService.getToken();
    });

    ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);

    const initData = async () => {
      if (loggedIn.value) {
        store.dispatch("userModule/fetchUser");
        store.dispatch("userModule/fetchBonus");
      }
    };

    onMounted(() => {
      initData();
    });

    return { route };
  },
});
</script>
