<template>
  <div class="banner-pic" @click="clickHandler">
    <div class="banner-pic__img">
      <img src="/assets/people.svg" />
    </div>
    <div class="banner-pic__text">Стань Волонтером!</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BannerPic",
  setup() {
    const router = useRouter();

    const clickHandler = () => {
      router.push("/tabs/development");
    };

    return { clickHandler };
  },
});
</script>

<style scoped lang="scss">
.banner-pic {
  height: 90px;
  background: #61c000;
  border-radius: 10px;
  overflow: visible;
  display: flex;
  align-items: center;
  margin-top: 40px;

  &__img {
    width: 163px;
    height: 107px;
    margin-right: 12px;
    margin-top: -17px;
    margin-left: 7px;
  }

  &__text {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
  }
}
</style>
