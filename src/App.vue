<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { computed, defineComponent, onMounted } from "vue";
import { TokenService } from "@/services/token.service";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const loggedIn = computed(() => {
      return !!TokenService.getToken();
    });

    const initData = async () => {
      if (loggedIn.value) {
        //
      }
    };

    onMounted(() => {
      initData();
    });
  },
});
</script>
