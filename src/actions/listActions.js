export const GET_OKR_LIST = 'GET_OKR_LIST';
export const GET_OKR_LIST_SUCCESS = 'GET_OKR_LIST_SUCCESS';
export const GET_OKR_LIST_FAILURE = 'GET_OKR_LIST_FAILURE';
export const FILTER_OKR_LIST = 'FILTER_OKR_LIST';

const fetchOkrList = () => {
  return async (dispatch) => {
    dispatch(getOkrList());
    try {
      const response = await fetch(
        'https://okrcentral.github.io/sample-okrs/db.json'
      );
      const data = await response.json();
      dispatch(getOkrListSuccess(data.data));
    } catch (error) {
      dispatch(getOkrListFailure());
    }
  };
};

export const getOkrList = () => ({ type: GET_OKR_LIST });

export const getOkrListSuccess = (okrList) => ({
  type: GET_OKR_LIST_SUCCESS,
  payload: okrList,
});

export const getOkrListFailure = () => ({ type: GET_OKR_LIST_FAILURE });

export const filterOkrList = (selectedCategories) => ({
  type: FILTER_OKR_LIST,
  payload: selectedCategories,
});

const allActions = {
  fetchOkrList,
  filterOkrList,
};

export default allActions;
