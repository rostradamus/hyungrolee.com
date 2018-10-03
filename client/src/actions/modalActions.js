import { modalConstants } from "./actionTypes";

export default class ModalActions {
  static closeModal() {
    return dispatch => dispatch({
      type: modalConstants.CLOSE_MODAL,
      payload: {content: ""}
    });
  }

  static openModal(content) {
    console.log(content);
    return dispatch => dispatch({
      type: modalConstants.OPEN_MODAL,
      payload: {content: content}
    });
  }

  static changeContent(content) {
    return dispatch => dispatch({
      type: modalConstants.CHANGE_CONTENT,
      payload: {content: content}
    });
  }
}