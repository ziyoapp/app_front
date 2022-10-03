import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { eventsGetRequest } from "@/interfaces/events.interface";
import { catchError } from "@/shared/utils";

class EventsError extends Error {
  errorCode: any;
  errorMessage: any;
  constructor(errorCode: any, message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
    if (message != null) {
      this.message = message;
    }
    this.errorCode = errorCode;
  }
}

const EventsServices = {
  getLatest: async function (data: eventsGetRequest) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/events/latest",
      params: data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, EventsError);
    }
  },
  getAll: async function (data: eventsGetRequest) {
    const requestData: AxiosRequestConfig = {
      method: "get",
      url: "/events",
      params: data,
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return response.data;
    } catch (error) {
      this.catchError(error, EventsError);
    }
  },
  catchError: catchError,
};

export { EventsServices, EventsError };
