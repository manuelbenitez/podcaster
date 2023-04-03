import { action } from "easy-peasy";
import { IDetailsModel } from "./details.types";

export const DetailsModel: IDetailsModel = {
  detailsList: [],
  isLoading: true,

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
    
  }),

  setDetails: action((state, payload) => {
    const found = state.detailsList.find(
      (element) => element.trackId === payload.trackId
    );
    if (!found) state.detailsList.push(payload);
  }),

  updateDetails: action((state, payload) => {
    state.detailsList.forEach((detail, index) => {
      if (detail.trackId === payload.trackId) {
        state.detailsList[index] = payload;
      }
    });
  }),
};
