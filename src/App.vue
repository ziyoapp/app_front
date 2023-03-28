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
import { useRoute, useRouter } from "vue-router";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";
import { PUSH_TOKEN_KEY } from "@/shared/constants";
// import { PushNotifications } from "@capacitor/push-notifications";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

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

    const initPushes = () => {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener("registration", (token: Token) => {
        console.log(`get token: ${JSON.stringify(token)}`);
        store.dispatch("userModule/sendPushToken", token.value);
      });

      // Some issue with our setup and push will not work
      PushNotifications.addListener("registrationError", (error: any) => {
        console.error(error);
        localStorage.removeItem(PUSH_TOKEN_KEY);
      });

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotificationSchema) => {
          console.log("pushNotificationReceived");
          console.log(JSON.stringify(notification));
          console.log("-----pushNotificationReceived");
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: ActionPerformed) => {
          console.log("pushNotificationActionPerformed");
          console.log(JSON.stringify(notification));
          console.log("-----pushNotificationActionPerformed");
          if (
            notification?.notification?.data?.type === "event" &&
            notification.notification?.data?.id
          ) {
            router.push(`/tabs/event/${notification.notification?.data?.id}`);
          }
        }
      );
    };

    onMounted(() => {
      initData();
      initPushes();
    });

    return { route };
  },
});
</script>
