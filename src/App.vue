<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { computed, defineComponent, onMounted } from "vue";
import { TokenService } from "@/services/token.service";
import { useStore } from "vuex";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const store = useStore();

    const loggedIn = computed(() => {
      return !!TokenService.getToken();
    });

    ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);

    const initData = async () => {
      if (loggedIn.value) {
        store.dispatch("userModule/fetchUser");
        store.dispatch("userModule/fetchBonus");
      }
    };

    onMounted(() => {
      initData();
    });
  },
});
</script>
