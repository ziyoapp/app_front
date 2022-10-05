import {
  eventsGetRequest,
  eventsState,
  event as oneEvent,
  event,
} from "@/interfaces/events.interface";
import { pagination } from "@/interfaces/common.interface";
import { EventsError, EventsServices } from "@/services/events.services";
import { defaultEvent } from "@/models/events.models";

const state: eventsState = {
  shortList: [],
  list: [],
  eventError: "",
  pagination: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: "",
    per_page: 4,
    to: 1,
    total: 1,
  },
  event: defaultEvent,
};

const getters = {
  error: (state: eventsState) => {
    return state.eventError;
  },
  getOne: (state: eventsState) => {
    return state.event;
  },
  getShortList: (state: eventsState) => {
    return state.shortList;
  },
  getAll: (state: eventsState) => {
    return state.list;
  },
  getPagination(state: eventsState) {
    return state.pagination;
  },
};

const actions = {
  async fetchShortList(context: any, dataSet: eventsGetRequest) {
    try {
      const { data } = await EventsServices.getLatest(dataSet);
      context.commit("setLatest", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof EventsError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchAll(
    context: any,
    dataSet: {
      data: eventsGetRequest;
      isInfiniteScroll: false;
    }
  ) {
    try {
      const { data, meta: pagination } = await EventsServices.getAll(
        dataSet.data
      );
      if (dataSet.isInfiniteScroll) {
        context.commit("pushToAll", data);
      } else {
        context.commit("setAll", data);
      }
      context.commit("setPagination", pagination);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof EventsError) {
        context.commit("dataError", {
          errorMessage: e.errorMessage || e.message,
          responseErrorCode: e.errorCode,
        });
      }
      return Promise.reject();
    }
  },
  async fetchOne(context: any, eventId: number) {
    try {
      const { data } = await EventsServices.getOne(eventId);
      context.commit("setOne", data);
      return Promise.resolve(data);
    } catch (e) {
      if (e instanceof EventsError) {
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
  setLatest(state: eventsState, list: Array<oneEvent>) {
    state.shortList = list;
  },
  setPagination(state: eventsState, pagination: pagination) {
    state.pagination = pagination;
  },
  setAll(state: eventsState, list: Array<oneEvent>) {
    state.list = list;
  },
  pushToAll(state: eventsState, list: Array<oneEvent>) {
    state.list.push(...list);
  },
  setOne(state: eventsState, data: event) {
    state.event = data;
  },
};

export const events = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
