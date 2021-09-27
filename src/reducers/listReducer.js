import * as actions from '../actions/listActions';
import { convertToHierarchicalTreeFormat } from '../utils/conversionUtil';

export const initialState = {
  okrList: [],
  filteredOkrList: [],
  toggleStateMap: {},
  okrListCategoryFilter: [],
  selectedOkrListCategoryFilter: new Set(),
  loading: false,
  hasErrors: false,
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_OKR_LIST:
      return { ...state, loading: true };
    case actions.GET_OKR_LIST_SUCCESS: {
      let { selectedOkrListCategoryFilter } = state;
      let {
        hierarchicalData: okrList,
        toggleStateMap,
      } = convertToHierarchicalTreeFormat(action.payload);
      const okrListCategoryFilter = action.payload.map((dataItem) => {
        return dataItem.category;
      });
      let catgorySet = new Set(okrListCategoryFilter);
      let filteredOkrList = okrList;
      if (selectedOkrListCategoryFilter.size) {
        filteredOkrList = okrList.filter((okrListItem) => {
          return action.payload.has(okrListItem.category);
        });
      }
      return {
        ...state,
        okrList,
        filteredOkrList,
        toggleStateMap,
        okrListCategoryFilter: [...catgorySet],
        loading: false,
        hasErrors: false,
      };
    }
    case actions.GET_OKR_LIST_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    case actions.FILTER_OKR_LIST: {
      let { okrList } = state;
      let selectedOkrListCategoryFilter = new Set(action.payload);
      let filteredOkrList = okrList;
      if (selectedOkrListCategoryFilter.size) {
        filteredOkrList = okrList.filter((okrListItem) => {
          return action.payload.has(okrListItem.category);
        });
      }
      return { ...state, filteredOkrList, selectedOkrListCategoryFilter };
    }
    default:
      return state;
  }
}
