<template>
  <div class="stories">
    <div class="stories__list">
      <ion-card
        class="stories__item"
        v-for="(story, index) in stories"
        :key="index"
        @click="storyClicked(index)"
      >
        <img :src="story.src" alt="" />
      </ion-card>
    </div>

    <!-- Stories View -->
    <ion-modal :is-open="showSlider" class="full-screen">
      <div class="overlay">
        <div class="stories__wrapper">
          <stories
            :autoplay="false"
            :duration="duration"
            :stories="stories"
            width="200px"
            height="200px"
            ref="stories_component"
            @ended="endedEvent"
            @next_story="nextStoryEvent"
            @prev_story="prevStoryEvent"
            @prev_slide="prevSlideEvent"
            @next_slide="nextSlideEvent"
            @slide_changed="slideChangedEvent"
            @swipe_up="swipe_up"
            @swipe_down="swipe_down"
            @swipe_left="swipe_left"
            @swipe_right="swipe_right"
          >
            <template v-slot:slide="{ slide }">
              <div class="slide">
                <img :src="slide.src" />
              </div>
            </template>
          </stories>
          <div class="stories__close">
            <ion-button @click="stopStory" size="small" color="dark">
              <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
            </ion-button>
          </div>
        </div>
      </div>
      <!-- /.overlay -->
    </ion-modal>
  </div>
</template>

<script>
import Stories from "vue3-insta-stories";
import { ref, reactive, toRefs } from "vue";
import { IonModal, IonCard, IonButton, IonIcon } from "@ionic/vue";
import { arrowBack } from "ionicons/icons";

export default {
  name: "StoriesSlider",
  components: { Stories, IonModal, IonCard, IonButton, IonIcon },
  setup() {
    const stories_component = ref(null);

    const localState = reactive({
      showSlider: false,
      duration: 5000,
      stories: [
        {
          custom_attribute: "Story 1",
          src: "/assets/stories/story1.svg",
          slides: [
            {
              id: 1,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story1.svg",
            },
            {
              id: 2,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story2.svg",
            },
            {
              id: 3,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story3.svg",
            },
          ],
        },
        {
          custom_attribute: "Story 2",
          src: "/assets/stories/story2.svg",
          slides: [
            {
              id: 1,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story1.svg",
            },
            {
              id: 2,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story2.svg",
            },
            {
              id: 3,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story3.svg",
            },
          ],
        },
        {
          custom_attribute: "Story 3",
          src: "/assets/stories/story3.svg",
          slides: [
            {
              id: 1,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story1.svg",
            },
            {
              id: 2,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story2.svg",
            },
            {
              id: 3,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story3.svg",
            },
          ],
        },
        {
          custom_attribute: "Story 1",
          src: "/assets/stories/story1.svg",
          slides: [
            {
              id: 1,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story1.svg",
            },
            {
              id: 2,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story2.svg",
            },
            {
              id: 3,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story3.svg",
            },
          ],
        },
        {
          custom_attribute: "Story 2",
          src: "/assets/stories/story2.svg",
          slides: [
            {
              id: 1,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story1.svg",
            },
            {
              id: 2,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story2.svg",
            },
            {
              id: 3,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story3.svg",
            },
          ],
        },
        {
          custom_attribute: "Story 3",
          src: "/assets/stories/story3.svg",
          slides: [
            {
              id: 1,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story1.svg",
            },
            {
              id: 2,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story2.svg",
            },
            {
              id: 3,
              color: "#D53738",
              duration: 3000,
              src: "/assets/stories/story3.svg",
            },
          ],
        },
      ],
    });

    const storyClicked = (index) => {
      localState.showSlider = false;
      localState.showSlider = true;
      setTimeout(() => {
        stories_component.value.recalculateDimensions();
        stories_component.value.playStory(index);
      }, 300);
    };

    const recalculateDimensions = () => {
      stories_component.value.recalculateDimensions();
    };
    const stopStory = () => {
      stories_component.value.stopStory();
      localState.showSlider = false;
    };
    const resetStory = () => {
      stories_component.value.resetStory();
    };
    const playStory = () => {
      stories_component.value.playStory();
    };
    const prevStory = () => {
      stories_component.value.prevStory();
    };
    const nextStory = () => {
      stories_component.value.nextStory();
    };
    const prevSlide = () => {
      stories_component.value.prevSlide();
    };
    const nextSlide = () => {
      stories_component.value.nextSlide();
    };
    //Events
    const endedEvent = () => {
      stopStory();
      localState.showSlider = false;
      // console.log("endedEvent");
    };
    const prevStoryEvent = () => {
      // console.log("%cprevStoryEvent: " + index, "color:red");
    };
    const nextStoryEvent = () => {
      // console.log("%cnextStoryEvent: " + index, "color:red");
    };
    const prevSlideEvent = () => {
      // console.log("prevSlideEvent: " + index);
    };
    const nextSlideEvent = () => {
      // console.log("nextSlideEvent: " + index);
    };
    const slideChangedEvent = () => {
      // console.log("slideChangedEvent: " + index);
    };
    const swipe_left = () => {
      // console.log("swipe_left Event");
      stories_component.value.nextStory();
    };
    const swipe_right = () => {
      // console.log("swipe_right Event");
      stories_component.value.prevStory();
    };
    const swipe_up = () => {
      // console.log("swipe_up Event");
    };
    const swipe_down = () => {
      stopStory();
      localState.showSlider = false;
    };

    return {
      ...toRefs(localState),
      stories_component,
      arrowBack,
      storyClicked,
      prevStory,
      prevSlide,
      prevStoryEvent,
      prevSlideEvent,
      nextStory,
      nextSlide,
      nextStoryEvent,
      nextSlideEvent,
      swipe_up,
      swipe_down,
      swipe_right,
      swipe_left,
      endedEvent,
      slideChangedEvent,
      recalculateDimensions,
      resetStory,
      stopStory,
      playStory,
    };
  },
};
</script>

<style scoped lang="scss">
.stories {
  &__list {
    display: flex;
    align-items: center;
    overflow-x: auto;
  }
  &__item {
    width: 90px;
    height: 90px;
    flex: 0 0 90px;
    margin-right: 10px;
    border-radius: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__wrapper {
    width: 100%;
    height: 100vh;
    .slide {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &__close {
    position: absolute;
    top: 20px;
    left: 10px;
    z-index: 10;
  }
}
</style>
