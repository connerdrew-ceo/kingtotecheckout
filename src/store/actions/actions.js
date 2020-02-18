export const SAVE_FIRST_STEP = 'SAVE_FIRST_STEP';

export const saveInfoFirstStep = info => {
  return dispatch => {
      dispatch({
        type: SAVE_FIRST_STEP,
        data: info
      });
  };
};



// store.dispatch({type: ADD_INFO_FIRST_STEP, info: {}})