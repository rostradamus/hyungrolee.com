import { modalConstants } from 'Actions/actionTypes';

export default (state = {}, action) => {
  console.log(action);
    switch (action.type) {
    case modalConstants.CLOSE_MODAL: {
        return Object.assign({... state}, {isModalOpen: false}, action.payload);
    }
    case modalConstants.OPEN_MODAL: {
      return Object.assign({... state}, {isModalOpen: true}, action.payload);
    }
    case modalConstants.CHANGE_CONTENT: {
      return Object.assign({... state}, action.payload);
    }
    default:
        return state;
    }
};