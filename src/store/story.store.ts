import { story } from "@/interfaces/common.interface";
import { StoryError, StoryService } from "@/services/story.services";

const state = {
  stories: [] as Array<story>,
  storyError: "",
};

const getters = {
  error: (state: any) => {
    return state.storyError;
  },
  getStories: (state: any) => {
    return state.stories.map((item: story) => {
      return {
        custom_attribute: item.title,
        src: item.preview_img_url,
        slides: item.images.map((src, indx) => ({
          id: indx,
          color: "#D53738",
          duration: 3000,
          src,
        })),
      };
    });
  },
};

const actions = {
  async fetchStories(context: any) {
    try {
      const { data } = await StoryService.getCategories();
      context.commit("setStories", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof StoryError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
};

const mutations = {
  setStories(state: any, list: Array<story>) {
    state.stories = list;
  },
};

export const storyModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
