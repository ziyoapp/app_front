<template>
  <div class="user">
    <div class="user__logo">
      <ion-img v-if="user.avatar" :src="user.avatar" />
      <ion-img v-else src="/assets/logo-default.svg" />
    </div>
    <div class="user__info">
      <div class="user__name">
        {{ user.first_name }} {{ user.last_name }} {{ user.patronymic }}
      </div>
      <div class="user__user-name">
        {{ user.email }}
      </div>
      <div class="user__phone">
        {{ user.phone }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { IonImg } from "@ionic/vue";
import { store } from "@/store";

export default defineComponent({
  name: "UserComponent",
  components: {
    IonImg,
  },
  setup() {
    const user = computed(() => {
      return store.getters["userModule/getUser"];
    });

    onMounted(() => {
      if (!user.value) {
        store.dispatch("userModule/fetchUser");
      }
    });

    return { user };
  },
});
</script>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  &__logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 11px;
    border: 2px solid #61c000;
    overflow: hidden;
  }

  &__name {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #001a35;
  }

  &__user-name {
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    color: #61c000;
    margin-bottom: 4px;
  }

  &__phone {
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: rgba(0, 26, 53, 0.5);
  }
}
</style>
